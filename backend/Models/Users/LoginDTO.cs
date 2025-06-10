using System.ComponentModel.DataAnnotations;

namespace backend.Models.Users;

public class LoginDTO
{
    [Required]
    public String Email { get; set; } = null!;
    [Required]
    public String Password { get; set; } = null!;
}