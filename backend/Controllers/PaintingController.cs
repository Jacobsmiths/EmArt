using backend.Data;
using backend.Models.Cart;
using backend.Models.Paintings;
using backend.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaintingsController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly BackendContext _context;
    private readonly ImageStorageOptions _imageStorage;

    public PaintingsController(BackendContext context, IOptions<ImageStorageOptions> imageStorageOptions, IWebHostEnvironment env)
    {
        _context = context;
        _imageStorage = imageStorageOptions.Value;
        _env = env;
    }

    [HttpPost]
    [Authorize(Roles = "Administrator")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CreatePaintingWithImages(
        [FromForm] string name,
        [FromForm] string description,
        [FromForm] double price,
        [FromForm] string dimensions,
        [FromForm] IFormFileCollection images
    )
    {
        var parts = dimensions.Split('x'); // dimensions should be of the form Height x Wdith but rmove space so HeightxWidth
        if (parts.Length != 2)
        {
            return BadRequest("Must Give dimensions of form: HeightxWidth");
        }

        double.TryParse(parts[0], out var height);
        double.TryParse(parts[1], out var width);

        var painting = new Painting
        {
            Name = name,
            Description = description,
            Price = price,
            Size = new Dimension { Height = height, Width = width },
            Images = []
        };

        // Save images to disk and create Image objects
        var saveDir = Path.Combine(_env.WebRootPath, _imageStorage.ImagesPath);
        Directory.CreateDirectory(saveDir);
        foreach (var file in images)
        {
            if (file.Length > 0)
            {
                var uniqueFileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(saveDir, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                painting.Images.Add(new Image
                {
                    FilePath = uniqueFileName,
                    Painting = painting
                });
            }
        }

        _context.Paintings.Add(painting);
        await _context.SaveChangesAsync();

        var dto = new PaintingDTO
        {
            Id = painting.Id,
            Name = painting.Name,
            Description = painting.Description,
            Size = painting.Size!,
            Price = painting.Price,
            FilePaths = painting.Images.Select(img => img.FilePath).ToList()
        };

        return CreatedAtAction(nameof(GetPainting), new { id = painting.Id }, dto);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaintingDTO>>> GetAllPaintings()
    {
        var paintings = await _context.Paintings
            .Include(p => p.Images)
            .ToListAsync();

        var dtos = paintings.Select(p => new PaintingDTO
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            Size = p.Size!,
            Price = p.Price,
            FilePaths = p.Images.Select(img => img.FilePath).ToList()
        });

        return Ok(dtos);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<PaintingDTO>> GetPainting(int id)
    {
        var painting = await _context.Paintings
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (painting == null)
            return NotFound();

        var dto = new PaintingDTO
        {
            Id = painting.Id,
            Name = painting.Name,
            Description = painting.Description ?? "",
            Size = painting.Size!,
            Price = painting.Price,
            FilePaths = [.. painting.Images.Select(img => img.FilePath)]
        };

        return Ok(dto);
    }

    [Authorize(Roles = "Administrator")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePainting(int id)
    {
        var painting = await _context.Paintings.FindAsync(id);
        if (painting == null)
            return NotFound();

        _context.Paintings.Remove(painting);
        await _context.SaveChangesAsync();
        return Ok("Painting " + id + " was deleted successfully");
    }
    
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdatePainting(
        int id,
        [FromForm] UpdatePaintingDTO update,
        [FromForm] IFormFileCollection? images
    )
    {
        var painting = await _context.Paintings
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (painting == null)
            return NotFound();

        // Cleanly update only non-null fields
        if (!string.IsNullOrWhiteSpace(update.Name)) painting.Name = update.Name;
        if (!string.IsNullOrWhiteSpace(update.Description)) painting.Description = update.Description;
        if (update.Price.HasValue) painting.Price = update.Price.Value;

        if (!string.IsNullOrWhiteSpace(update.Dimensions))
        {
            var parts = update.Dimensions.Split('x');
            if (parts.Length == 2 &&
                double.TryParse(parts[0], out var height) &&
                double.TryParse(parts[1], out var width))
            {
                painting.Size = new Dimension { Height = height, Width = width };
            }
            else return BadRequest("Invalid dimensions format. Use HeightxWidth.");
        }

        if (images is { Count: > 0 })
        {
            foreach (var oldImage in painting.Images)
            {
                var filePath = Path.Combine(_env.WebRootPath, _imageStorage.ImagesPath, Path.GetFileName(oldImage.FilePath));
                if (System.IO.File.Exists(filePath)) System.IO.File.Delete(filePath);
            }

            _context.Images.RemoveRange(painting.Images);
            painting.Images.Clear();

            var saveDir = Path.Combine(_env.WebRootPath, _imageStorage.ImagesPath);
            Directory.CreateDirectory(saveDir);

            foreach (var file in images)
            {
                var uniqueFileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(saveDir, uniqueFileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                painting.Images.Add(new Image
                {
                    FilePath = Path.Combine(_imageStorage.PublicUrlBase, uniqueFileName),
                    Painting = painting
                });
            }
        }

        await _context.SaveChangesAsync();
        return Ok("Painting updated successfully");
    }



}