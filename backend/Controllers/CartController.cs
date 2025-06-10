using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models.Cart;
using backend.Identity;
using backend.Models.Paintings;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "User, Administrator")]
public class CartController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly BackendContext _context;

    public CartController(UserManager<AppUser> userManager, BackendContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var userId = User.FindFirstValue("uid");
        var user = await _context.Users
            .Include(u => u.Cart)
                .ThenInclude(c => c.CartItems)
                    .ThenInclude(ci => ci.Painting)
                        .ThenInclude(p => p.Images)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user?.Cart == null) return NotFound();

        var dto = new CartDTO
        {
            CartItems = user.Cart.CartItems.Select(ci => new CartItemDTO
            {
                PaintingId = ci.Painting.Id,
                Name = ci.Painting.Name,
                Description = ci.Painting.Description ?? "",
                Price = ci.Painting.Price,
                FilePath = ci.Painting.Images.FirstOrDefault()?.FilePath ?? ""
            }).ToList()
        };

        return Ok(dto);
    }

    [HttpPost("add/{paintingId}")]
    public async Task<IActionResult> AddToCart(int paintingId)
    {
        var user = await GetCurrentUserWithCart();
        if (user?.Cart == null) return NotFound("Cart not found");

        if (user.Cart.CartItems.Any(ci => ci.PaintingId == paintingId))
            return BadRequest("Painting already in cart");

        var painting = await _context.Paintings.FindAsync(paintingId);
        if (painting == null) return NotFound("Painting not found");

        user.Cart.CartItems.Add(new CartItem { PaintingId = paintingId });
        await _context.SaveChangesAsync();

        return Ok("Added to cart");
    }

    [HttpDelete("remove/{paintingId}")]
    public async Task<IActionResult> RemoveFromCart(int paintingId)
    {
        var user = await GetCurrentUserWithCart();
        if (user?.Cart == null) return NotFound("Cart not found");

        var item = user.Cart.CartItems.FirstOrDefault(i => i.PaintingId == paintingId);
        if (item == null) return NotFound("Item not in cart");

        _context.CartItems.Remove(item);
        await _context.SaveChangesAsync();

        return Ok("Removed from cart");
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart()
    {
        var user = await GetCurrentUserWithCart();
        if (user?.Cart == null) return NotFound("Cart not found");

        _context.CartItems.RemoveRange(user.Cart.CartItems);
        await _context.SaveChangesAsync();

        return Ok("Cart cleared");
    }

    private async Task<AppUser?> GetCurrentUserWithCart()
    {
        var userId = User.FindFirstValue("uid");
        if (userId == null) return null;

        return await _context.Users
            .Include(u => u.Cart)
                .ThenInclude(c => c.CartItems)
            .FirstOrDefaultAsync(u => u.Id == userId);
    }
}
