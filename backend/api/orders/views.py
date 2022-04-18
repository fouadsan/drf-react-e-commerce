from django.db.models import F
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer
from api.products.models import Product


class OrderCreate(APIView):
    queryset = OrderItem.objects.all()
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        user = request.user
        data = request.data
        order_items = data['order_items']
        
        if order_items and len(order_items) == 0:
            return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        
        order = Order.objects.create(
            user,
            payment_method=data['payment_method'],
            tax_price=data['tax_price'],
            shipping_price=data['shipping_price'],
            total_price=data['total_price'],
        )
        
        shipping_address = ShippingAddress.objects.create(
            order,
            address=data['shipping_address']['address'],
            city=data['shipping_address']['city'],
            postal_code = data['shipping_address']['postal_code'],
            country=data['shipping_address']['country'],
        )
        
        for item in order_items:
            product = Product.objects.get(id=item['product_id'])
            
            item = OrderItem.objects.create(
                product,
                order,
                name=product.name,
                quantity=item['quantity'],
                price=item['price'],
                image=product.image.url
            )
            
            product.update(count_in_stock=F('count_in_stock') - item.quantity)
        
        serializer = OrderSerializer(order, many=False)
        if serializer.is_valid():  
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)