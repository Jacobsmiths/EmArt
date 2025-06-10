using backend.Models.Users;
using Microsoft.AspNetCore.Identity;

namespace backend.Interface;
public interface IAuthService
{
    Task<IEnumerable<IdentityError>> Register(AppUserDTO userDto);
    Task<AuthResponseDTO> Login(LoginDTO loginDto);
}
