namespace backend.Models.Paintings;

public class PaintingDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public double Price { get; set; }
    public Dimension Size { get; set; } = new();
    public List<string> FilePaths { get; set; } = new();

}