using System.ComponentModel.DataAnnotations;

namespace backend.Models.User;
public class RegisterDTO
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 6)]
    public required string Password { get; set; }
}
