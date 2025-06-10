namespace backend.Models.Cart;

using backend.Models.Paintings;

public class CartItem
{
    public int Id { get; set; }
    public int PaintingId { get; set; }
    public Painting Painting { get; set; } = null!;
    public int CartId { get; set; }
    public Cart Cart { get; set; } = null!;
}