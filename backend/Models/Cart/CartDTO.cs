using backend.Models.Users;

namespace backend.Models.Cart;

public class CartDTO
{
    public ICollection<CartItemDTO> CartItems { get; set; } = [];
}