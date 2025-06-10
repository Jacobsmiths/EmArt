namespace backend.Models.Gallery;

public class Gallery
{
    public int Id { get; set; }
    public string Name { get; set; } = ""; // e.g., "Main Wall"
    public ICollection<GalleryItem> Items { get; set; } = new List<GalleryItem>();
}
