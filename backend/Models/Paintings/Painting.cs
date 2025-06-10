using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Paintings;

public class Painting
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public Dimension? Size { get; set; }
    [Column(TypeName = "decimal(6,2)")]
    public required double Price { get; set; }
    public ICollection<Image> Images { get; set; } = new List<Image>();
}