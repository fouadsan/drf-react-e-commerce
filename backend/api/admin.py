from django.contrib import admin

from api.products.models import Product, Review
from api.orders.models import Order, OrderItem, ShippingAddress

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
