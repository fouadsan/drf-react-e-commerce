from django.urls import path

from .views import OrderCreate

urlpatterns = [
    # path('add/', OrderItemCreate.as_view(), name="order-add"),
    path('add/', OrderCreate.as_view(), name="order-add"),
]
