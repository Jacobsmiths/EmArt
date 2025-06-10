namespace backend.Models.Paintings;

public class UpdatePaintingDTO
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public double? Price { get; set; }
    public string? Dimensions { get; set; }
}