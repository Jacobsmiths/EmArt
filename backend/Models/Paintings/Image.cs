using System.ComponentModel.DataAnnotations;

namespace backend.Models.Paintings;

public class Image
{
    public int Id { get; set; }
    public string FilePath { get; set; } = "";
    public int PaintingId { get; set; }
    public Painting Painting { get; set; } = null!;
}
