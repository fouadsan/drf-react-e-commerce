from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer
from api.products.models import Product


class OrderCreate(APIView):
    # queryset = OrderItem.objects.all()
    # serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format='json'):
        user=request.user,
        data = request.data
        order_items = data['orderItems']
        
        if order_items and len(order_items) == 0:
            return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        order = Order.objects.create(
            payment_method=data['paymentMethod'],
            tax_price=data['taxPrice'],
            shipping_price=data['shippingPrice'],
            total_price=data['totalPrice'],
        )
        
        shipping_address = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postal_code = data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        
        for item in order_items:
            product = Product.objects.get(id=item['id'])
            
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=item['amount'],
                price=item['price'],
                image=product.image.url
            )
            
            product.count_in_stock -= item.quantity
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)