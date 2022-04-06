from django.urls import path

from .views import ProductList, ProductDetalil, MyTokenObtainPairView, get_user_profile


urlpatterns = [
    path('users/login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('products/', ProductList.as_view(), name="products"),
    path('products/<str:pk>/', ProductDetalil.as_view(), name="product-detail"),
    path('users/profile/', get_user_profile, name="user-profile"),
]
