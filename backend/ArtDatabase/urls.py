from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    # Paintings
    path('paintings/', views.PaintingList.as_view(), name='painting-list'),
    path('paintings/<int:pk>/', views.PaintingDetail.as_view(), name='painting-detail'),

    # Galleries
    path('galleries/', views.GalleryList.as_view(), name='gallery-list'),
    path('galleries/<int:pk>/', views.GalleryDetail.as_view(), name='gallery-detail'),

    # GalleryPainting (through model)
    path('gallery-paintings/', views.GalleryPaintingList.as_view(), name='gallery-painting-list'),
    path('gallery-paintings/<int:pk>/', views.GalleryPaintingDetail.as_view(), name='gallery-painting-detail'),

    # Portfolios
    path('portfolios/', views.PortfolioList.as_view(), name='portfolio-list'),
    path('portfolios/<int:pk>/', views.PortfolioDetail.as_view(), name='portfolio-detail'),

    # PortfolioPainting (through model)
    path('portfolio-paintings/', views.PortfolioPaintingList.as_view(), name='portfolio-painting-list'),
    path('portfolio-paintings/<int:pk>/', views.PortfolioPaintingDetail.as_view(), name='portfolio-painting-detail'),

    path('painting-images/', views.PaintingImageList.as_view(), name='painting-image-list'),
    path('painting-images/<int:pk>/', views.PaintingImageDetail.as_view(), name='painting-image-detail'),
    
    #handles tokens
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
]
