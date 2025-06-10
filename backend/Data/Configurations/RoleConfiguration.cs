namespace backend.Data.Configurations;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
{
    builder.HasData(
        new IdentityRole
        {
            Id = "admin-role-id",
            Name = "Administrator",
            NormalizedName = "ADMINISTRATOR"
        },
        new IdentityRole
        {
            Id = "user-role-id",
            Name = "User",
            NormalizedName = "USER"
        }
    );
}

}