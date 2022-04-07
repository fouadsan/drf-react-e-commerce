from django.urls import path

from .views import ProductList, ProductDetalil

urlpatterns = [
    path('', ProductList.as_view(), name="products"),
    path('<str:pk>/', ProductDetalil.as_view(), name="product-detail"),
]
