using backend.Identity;
namespace backend.Models.Cart;

public class Cart
{
    public int Id { get; set; }
    public string UserId { get; set; } = null!;
    public AppUser User { get; set; } = null!;
    public ICollection<CartItem> CartItems { get; set; } = [];
}