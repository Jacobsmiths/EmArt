
using Microsoft.AspNetCore.Identity;
using backend.Models.Cart;

namespace backend.Identity;

public class AppUser : IdentityUser
{
    public Cart? Cart { get; set; } // One-to-one
}