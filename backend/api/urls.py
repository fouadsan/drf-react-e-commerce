from django.urls import path

from .views import ProductList


urlpatterns = [
    path('products', ProductList.as_view(), name="products"),
    path('products/<str:pk>/', ProductList.as_view(), name="product-detail"),
]
