from django.urls import path

from .views import OrderItemCreate

urlpatterns = [
    path('add/', OrderItemCreate.as_view(), name="order-add"),
]
