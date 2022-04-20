from asyncore import read
from rest_framework import serializers

from .models import Order, OrderItem, ShippingAddress
from api.users.serializers import CustomUserSerializer


        
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        


        
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
    
    def get_user(self, obj):
        user = obj.user
        serializer = CustomUserSerializer(user, many=False)
        return serializer.data
    
    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(obj.order_shipp, many=False).data
        except:
            address = False
        return address
    