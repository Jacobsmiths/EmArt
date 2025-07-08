from ArtDatabase.models import (
    Painting, Gallery, GalleryPainting,
    Portfolio, PortfolioPainting, PaintingImage
)
from ArtDatabase.serializers import (
    PaintingSerializer, GallerySerializer, GalleryPaintingSerializer,
    PortfolioSerializer, PortfolioPaintingSerializer,PaintingImageSerializer
)
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

# Gives all paintings
class PaintingList(generics.ListCreateAPIView):    
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer

    def post(self, request, *args, **kwargs):
        # Create Painting object
        painting = Painting.objects.create(
            name=request.data.get("name"),
            description=request.data.get("description"),
            price=request.data.get("price"),
            width=request.data.get("width"),
            height=request.data.get("height"),
            forSale=request.data.get("forSale") == 'true',
            sold=request.data.get("sold") == 'true',
        )

        # Get files
        files = request.FILES.getlist("images")
        metadata = json.loads(request.data.get("image_metadata", "[]"))
        for i, file in enumerate(files):
            order = metadata[i]["order"]
            PaintingImage.objects.create(
                painting=painting,
                image=file,
                order=order
            )

        return Response({"message": "Painting and images created"}, status=status.HTTP_201_CREATED)
    
    

# Gives details of individual paintings
class PaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer
    parser_classes = [MultiPartParser, FormParser]  # Required to handle FormData

    def put(self, request, *args, **kwargs):
        # Get the existing painting object
        painting = self.get_object()

        # Update fields manually (or pass to serializer)
        painting.name = request.data.get("name", painting.name)
        painting.description = request.data.get("description", painting.description)
        painting.price = request.data.get("price", painting.price)
        painting.width = request.data.get("width", painting.width)
        painting.height = request.data.get("height", painting.height)
        painting.forSale = request.data.get("forSale", painting.forSale) == 'true'
        painting.sold = request.data.get("sold", painting.sold) == 'true'
        painting.save()

        # Optional: Clear existing images
        painting.images.all().delete()

        # Add new images (if any)
        files = request.FILES.getlist("images")
        metadata = json.loads(request.data.get("image_metadata", "[]"))

        for i, file in enumerate(files):
            order = metadata[i]["order"] if i < len(metadata) else i + 1
            PaintingImage.objects.create(
                painting=painting,
                image=file,
                order=order
            )

        return Response({"message": "Painting updated with images"}, status=status.HTTP_200_OK)
    
    
# Gives all images in the database
class PaintingImageList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PaintingImage.objects.all()
    serializer_class = PaintingImageSerializer

class PaintingImageDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PaintingImage.objects.all()
    serializer_class = PaintingImageSerializer

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

    def create(self, request, *args, **kwargs):
        # Get the painting and gallery objects
        painting = Painting.objects.get(id=request.data.get('painting'))
        gallery = Gallery.objects.get(id=request.data.get('gallery'))
        
        # Create the gallery painting
        gallery_painting = GalleryPainting.objects.create(
            paintings=painting,
            galleries=gallery,
            Xpos=request.data.get('Xpos', 0),
            Ypos=request.data.get('Ypos', 0)
        )
        
        serializer = self.get_serializer(gallery_painting)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

    def create(self, request, *args, **kwargs):
        # Get the painting and gallery objects
        painting = Painting.objects.get(id=request.data.get('painting'))
        portfolio = Portfolio.objects.get(id=request.data.get('portfolio'))
        
        # Create the gallery painting
        portfolio_painting = PortfolioPainting.objects.create(
            paintings=painting,
            portfolio=portfolio,
            order=request.data.get('order', 0),
        )
        
        serializer = self.get_serializer(portfolio_painting)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# this gives us the specific details about paintings in the portfolio like order of painting
class PortfolioPaintingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = PortfolioPainting.objects.all()
    serializer_class = PortfolioPaintingSerializer
