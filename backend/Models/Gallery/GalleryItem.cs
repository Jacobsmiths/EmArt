using backend.Models.Paintings;

namespace backend.Models.Gallery;

public class GalleryItem
{
    public int Id { get; set; }

    public int GalleryId { get; set; }
    public Gallery Gallery { get; set; } = null!;

    public int PaintingId { get; set; }
    public Painting Painting { get; set; } = null!;

    public int X { get; set; }
    public int Y { get; set; }
}
