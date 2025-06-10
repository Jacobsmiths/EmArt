namespace backend.Data;

using backend.Models.Paintings;
using backend.Models.Cart;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using backend.Data.Configurations;
using backend.Identity;
using backend.Models.Gallery;

public class BackendContext : IdentityDbContext<AppUser>
{
    public BackendContext(DbContextOptions<BackendContext> options) : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // always call base first
        modelBuilder.Entity<Gallery>()
            .HasMany(g => g.Items)
            .WithOne(i => i.Gallery)
            .HasForeignKey(i => i.GalleryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<GalleryItem>()
            .HasOne(i => i.Painting)
            .WithMany() // if Painting doesn't track back to GalleryItem
            .HasForeignKey(i => i.PaintingId);
            
        modelBuilder.Entity<Painting>()
            .OwnsOne(p => p.Size);

        modelBuilder.Entity<AppUser>()
            .HasOne(u => u.Cart)
            .WithOne(c => c.User)
            .HasForeignKey<Cart>(c => c.UserId);
        
        modelBuilder.ApplyConfiguration(new RoleConfiguration());
    }

    public DbSet<Painting> Paintings { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<Gallery> Galleries { get; set; }
    public DbSet<GalleryItem> GalleryItems { get; set; }
} 