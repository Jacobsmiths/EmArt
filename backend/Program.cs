using backend.Data;
using backend.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Options;
using Microsoft.OpenApi.Models;
using backend.Interface;
using backend.Repository;
using server.Configurations;
using System.Security.Claims;
using backend.Models.Gallery;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<BackendContext>(options =>
    options.UseSqlite("Data Source=EmArt.db")); 

builder.Services.AddIdentityCore<AppUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<BackendContext>();

builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<BackendContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<ImageStorageOptions>(builder.Configuration.GetSection("ImageStorage"));

builder.Services.AddAutoMapper(typeof(MapperConfig)); // Register AutoMapper
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>)); // Register Generic Repository
builder.Services.AddScoped<IAuthService, AuthService>(); // Register Auth Service

// Add JWT authentication
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        NameClaimType = ClaimTypes.NameIdentifier,
    };
});

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(name: JwtBearerDefaults.AuthenticationScheme,
    securityScheme: new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter the bearer Authorization : `Bearer Generated-JWT-Token`",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                }
            }, new string[] { }
        }
    });
});  

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(System.Net.IPAddress.Loopback, 8000); 
});

var app = builder.Build();

// using (var scope = app.Services.CreateScope())
// {
//     var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

//     string[] roles = { "User", "Administrator" }; // or whatever you use

//     foreach (var role in roles)
//     {
//         if (!await roleManager.RoleExistsAsync(role))
//         {
//             await roleManager.CreateAsync(new IdentityRole(role));
//         }
//     }
// }

// using (var scope = app.Services.CreateScope())
// {
//     var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
//     var user = await userManager.FindByEmailAsync("jaco.smith589@gmail.com");

//     if (user != null && !await userManager.IsInRoleAsync(user, "Administrator"))
//     {
//         await userManager.AddToRoleAsync(user, "Administrator");
//     }
// }

// using (var scope = app.Services.CreateScope())
// {
//     var context = scope.ServiceProvider.GetRequiredService<BackendContext>();

//     // Ensure DB is created and apply migrations
//     context.Database.Migrate();

//     // Seed a default gallery if none exist
//     if (!context.Galleries.Any())
//     {
//         context.Galleries.Add(new Gallery { /* Id is auto-generated */ });
//         await context.SaveChangesAsync();
//         Console.WriteLine("Seeded default gallery.");
//     }
// }


// app.MapIdentityApi<IdentityUser>(); MUST ADD TO USE EMAIL FUNCTIONALITY LATER ON like mailing lists

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
