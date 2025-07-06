from django.contrib import admin
from .models import Painting
from .models import Gallery
from .models import Portfolio
from .models import GalleryPainting
from .models import PortfolioPainting
from .models import PaintingImage


admin.site.register(Painting)
admin.site.register(Gallery)
admin.site.register(Portfolio)
admin.site.register(GalleryPainting)
admin.site.register(PortfolioPainting)
admin.site.register(PaintingImage)
