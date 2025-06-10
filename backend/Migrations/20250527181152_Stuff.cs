using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Stuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WallY",
                table: "GalleryItems",
                newName: "Y");

            migrationBuilder.RenameColumn(
                name: "WallX",
                table: "GalleryItems",
                newName: "X");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Y",
                table: "GalleryItems",
                newName: "WallY");

            migrationBuilder.RenameColumn(
                name: "X",
                table: "GalleryItems",
                newName: "WallX");
        }
    }
}
