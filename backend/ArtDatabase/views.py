from ArtDatabase.models import (
    Painting, Gallery, GalleryPainting,
    Portfolio, PortfolioPainting
)
from ArtDatabase.serializers import (
    PaintingSerializer, GallerySerializer, GalleryPaintingSerializer,
    PortfolioSerializer, PortfolioPaintingSerializer
)
from rest_framework import generics, permissions


# Gives all paintings
class PaintingList(generics.ListCreateAPIView):    
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

# Gives details of individual paintings
class PaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

# gives all galleries and elements in galleries
class GalleryList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

# gives all paintings and positions of paintings in specific galleries
class GalleryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

# gets all paintings in a gallery
class GalleryPaintingList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = GalleryPainting.objects.all()
    serializer_class = GalleryPaintingSerializer

# gets painting details of specific paintings in galleries
class GalleryPaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = GalleryPainting.objects.all()
    serializer_class = GalleryPaintingSerializer

# This gives a list of all portfolios
class PortfolioList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

# this gives details of each portfolio (there will be only 1)
class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

# This gives us all paintings in a portfolio
class PortfolioPaintingList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PortfolioPainting.objects.all()
    serializer_class = PortfolioPaintingSerializer

# this gives us the specific details about paintings in the portfolio like order of painting
class PortfolioPaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PortfolioPainting.objects.all()
    serializer_class = PortfolioPaintingSerializer
