from django.urls import path, include

urlpatterns = [
    path('products/', include('api.products.urls')),
    path('users/', include('api.users.urls')),
    path('orders/', include('api.orders.urls')),

]
