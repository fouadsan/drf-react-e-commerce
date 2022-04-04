from django.urls import path

from .views import ProductList, ProductDetalil


urlpatterns = [
    path('products/', ProductList.as_view(), name="products"),
    path('products/<str:pk>/', ProductDetalil.as_view(), name="product-detail"),
]
