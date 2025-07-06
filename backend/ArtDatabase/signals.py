from django.db.models.signals import post_delete
from django.dispatch import receiver
from ArtDatabase.models import PaintingImage

@receiver(post_delete, sender=PaintingImage)
def delete_image_file(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)