from django.urls import path

from .views import OrderListCreate, OrderDetalil

urlpatterns = [
    # path('add/', OrderItemCreate.as_view(), name="order-add"),
    path('', OrderListCreate.as_view(), name="orders"),
    path('<str:pk>/', OrderDetalil.as_view(), name="order-detail"),
]
