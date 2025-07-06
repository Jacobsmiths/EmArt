from django.db import models

class Painting(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.CharField(max_length=300)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    forSale = models.BooleanField(default=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} for {self.price}"


class PaintingImage(models.Model):
    painting = models.ForeignKey(Painting, on_delete=models.CASCADE, related_name="images")
    order = models.IntegerField(null=True)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return f"{self.image}"


class Gallery(models.Model):
    name = models.CharField(max_length=50)
    paintings = models.ManyToManyField(Painting, through="GalleryPainting")

    def __str__(self):
        return f"{self.name}"
    
class GalleryPainting(models.Model):
    paintings = models.ForeignKey(Painting, null=True, on_delete=models.CASCADE)
    galleries = models.ForeignKey(Gallery, null=True, on_delete=models.CASCADE)
    Xpos = models.IntegerField()
    Ypos = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["paintings", "galleries"], name="unique_gallery_painting"
            )
        ]
    
    def __str__(self):
        return f"Gallery paintings: {self.paintings}"

class Portfolio(models.Model):
    name = models.CharField(max_length=50)
    paintings = models.ManyToManyField(Painting, through="PortfolioPainting")
    
    def save(self, *args, **kwargs):
        if not self.pk and Portfolio.objects.exists():
            raise ValueError("There can only be one Portfolio instance.")
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

class PortfolioPainting(models.Model):
    paintings = models.ForeignKey(Painting, null=True, on_delete=models.CASCADE)
    portfolio = models.ForeignKey(Portfolio, null=True, on_delete=models.CASCADE)
    order = models.PositiveIntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["paintings", "portfolio"], name="unique_portfolio_painting"
            )    
        ]
        ordering = ['order']

    def __str__(self):
        return f"Portfolio paintings: {self.paintings}"
    