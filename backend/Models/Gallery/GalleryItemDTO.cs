using backend.Models.Paintings;

namespace backend.Models.Gallery;

public class GalleryItemDTO
{
    public int PaintingId { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
    public string FilePath { get; set; } = "";
    public int X { get; set; }
    public int Y { get; set; }
}
