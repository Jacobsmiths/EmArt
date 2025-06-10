using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models.Gallery;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GalleryController : ControllerBase
{
    private readonly BackendContext _context;

    public GalleryController(BackendContext context)
    {
        _context = context;
    }

    [HttpGet("{galleryId}")]
    public async Task<ActionResult<GalleryDTO>> GetGallery(int galleryId)
    {
        var gallery = await _context.Galleries
            .Include(g => g.Items)
                .ThenInclude(i => i.Painting)
                    .ThenInclude(p => p.Images)
            .FirstOrDefaultAsync(g => g.Id == galleryId);

        if (gallery == null)
            return NotFound();

        var dto = new GalleryDTO
        {
            Items = gallery.Items.Select(i => new GalleryItemDTO
            {
                PaintingId = i.Painting.Id,
                Name = i.Painting.Name,
                Price = i.Painting.Price,
                FilePath = i.Painting.Images.FirstOrDefault()?.FilePath ?? "",
                X = i.X,
                Y = i.Y
            }).ToList()
        };

        return Ok(dto);
    }


    [HttpPost("{galleryId}/add")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> AddToGallery(int galleryId, [FromBody] UpdateGalleryItemDTO dto)
    {
        var painting = await _context.Paintings.FindAsync(dto.PaintingId);
        if (painting == null) return NotFound("Painting not found");

        var gallery = await _context.Galleries
            .Include(g => g.Items)
            .FirstOrDefaultAsync(g => g.Id == galleryId);

        if (gallery == null) return NotFound("Gallery not found");

        if (gallery.Items.Any(i => i.PaintingId == dto.PaintingId))
            return BadRequest("Painting already in gallery");

        gallery.Items.Add(new GalleryItem
        {
            PaintingId = dto.PaintingId,
            GalleryId = galleryId,
            X = dto.X,
            Y = dto.Y
        });

        await _context.SaveChangesAsync();
        return Ok("Painting added to gallery");
    }


    [HttpPut("{galleryId}/item/{paintingId}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateGalleryItem(int galleryId, int paintingId, [FromBody] UpdateGalleryItemDTO update)
    {
        var item = await _context.GalleryItems
            .FirstOrDefaultAsync(i => i.GalleryId == galleryId && i.PaintingId == paintingId);

        if (item == null)
            return NotFound("Gallery item not found");

        item.X = update.X;
        item.Y = update.Y;

        await _context.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{galleryId}/item/{paintingId}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> RemoveFromGallery(int galleryId, int paintingId)
    {
        var item = await _context.GalleryItems
            .FirstOrDefaultAsync(i => i.GalleryId == galleryId && i.PaintingId == paintingId);

        if (item == null)
            return NotFound("Gallery item not found");

        _context.GalleryItems.Remove(item);
        await _context.SaveChangesAsync();

        return Ok("Removed from gallery");
    }


}
