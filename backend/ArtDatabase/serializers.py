from rest_framework import serializers
from .models import (
    Painting, PaintingImage,
    Gallery, GalleryPainting,
    Portfolio, PortfolioPainting
)

class PaintingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaintingImage
        fields = ['id', 'image', 'order', 'painting']

class PaintingSerializer(serializers.ModelSerializer):
    images = PaintingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Painting
        fields = [
            'id', 'name', 'price', 'description',
            'width', 'height', 'forSale', 'sold', 'images'
        ]

class GalleryPaintingSerializer(serializers.ModelSerializer):
    painting = PaintingSerializer(source='paintings', read_only=True)

    class Meta:
        model = GalleryPainting
        fields = ['id', 'painting', 'Xpos', 'Ypos']

class GallerySerializer(serializers.ModelSerializer):
    paintings = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ['id', 'name', 'paintings']

    def get_paintings(self, obj):
        gallery_paintings = GalleryPainting.objects.filter(galleries=obj)
        return GalleryPaintingSerializer(gallery_paintings, many=True).data

class PortfolioPaintingSerializer(serializers.ModelSerializer):
    painting = PaintingSerializer(source='paintings', read_only=True)

    class Meta:
        model = PortfolioPainting
        fields = ['id', 'painting', 'order']

class PortfolioSerializer(serializers.ModelSerializer):
    paintings = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'paintings']

    def get_paintings(self, obj):
        portfolio_paintings = PortfolioPainting.objects.filter(portfolio=obj).order_by('order')
        return PortfolioPaintingSerializer(portfolio_paintings, many=True).data
