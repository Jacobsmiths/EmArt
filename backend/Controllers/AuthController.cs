using Microsoft.AspNetCore.Mvc;
using backend.Interface;
using backend.Models.Users;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{

    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]

    public async Task<ActionResult> Register([FromBody] AppUserDTO userDTO)
    {
        var errors = await _authService.Register(userDTO);

        if (errors.Any())
        {
            foreach (var error in errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return BadRequest(ModelState);
        }
        return Ok(new { message = "User registered successfully" });
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Login([FromBody] LoginDTO loginDTO)
    {
        var authResponse = await _authService.Login(loginDTO);

        if (authResponse == null)
        {
            return BadRequest(new { message = "Invalid login Credentials" });
        }
        return Ok(authResponse);
    }

}
