namespace backend.Models.Gallery;

public class GalleryDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<GalleryItemDTO> Items { get; set; } = new();
}
