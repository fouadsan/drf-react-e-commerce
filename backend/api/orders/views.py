from datetime import datetime
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import status
from rest_framework.response import Response

from .models import Order, OrderItem, ShippingAddress
from .serializers import OrderSerializer
from api.products.models import Product
from api.users.models import Account


class OrderDetailPermission(BasePermission):
    message = "Not Authorized to view this order"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return request.user.is_staff or obj.user == Account.objects.get(id=request.user.id)

class OrderCreate(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format='json'):
        user = Account.objects.get(id=request.user.id)
        data = request.data
        order_items = data['orderItems']
        
        if order_items and len(order_items) == 0:
            return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
        order = Order.objects.create(
            user=user,
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
                image=request.build_absolute_uri(product.image.url)
            )
            
            product.count_in_stock -= item.quantity
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class OrderDetalil(generics.RetrieveUpdateAPIView, OrderDetailPermission):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, OrderDetailPermission]
    
    def perform_update(self, serializer):
        serializer.save(is_paid=True, paid_at=datetime.now())