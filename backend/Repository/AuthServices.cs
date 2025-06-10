using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using backend.Interface;
using backend.Models.Users;
using backend.Identity;
using backend.Models.Cart;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Repository;

public class AuthService : IAuthService
{
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly BackendContext _context;
    public AuthService(IMapper mapper, UserManager<AppUser> userManager, IConfiguration configuration, BackendContext context)
    {
        _mapper = mapper;
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }

    public async Task<IEnumerable<IdentityError>> Register(AppUserDTO userDto)
    {
        var user = _mapper.Map<AppUser>(userDto);
        user.UserName = userDto.Email;

        var result = await _userManager.CreateAsync(user, userDto.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "User");
            var cart = new Cart
            {
                UserId = user.Id
            };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        
        return result.Errors;
    }
    public async Task<AuthResponseDTO> Login([FromBody] LoginDTO loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        var isValidUser = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if(user == null || isValidUser == false){
            return null;
        }

        var token = await GenerateToken(user);
        return new AuthResponseDTO
        {
            Token = token,
            UserId = user.Id
        };
    }

    private async Task<string> GenerateToken(AppUser user){
        var securityKey = new SymmetricSecurityKey(Encoding .UTF8.GetBytes(_configuration["JWT:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var roles = await _userManager.GetRolesAsync(user);
        var roleClaims = roles.Select(x => new Claim(ClaimTypes.Role, x)).ToList();
        var userClaims = await _userManager.GetClaimsAsync(user);
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("uid", user.Id),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
        }.Union(userClaims).Union(roleClaims);

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:Issuer"],
            audience: _configuration["JWT:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToInt32(_configuration["JWT:TimeOutDuration"])),
            signingCredentials: credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    } 
}