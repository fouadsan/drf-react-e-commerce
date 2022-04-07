from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .serializers import UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializer(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserList(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegister(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.create(
                    first_name=request.data['name'],
                    username=request.data['email'],
                    email=request.data['email'],
                    password=make_password(request.data['password']),
                )

                if user:
                    json = serializer.data
                    return Response(json, status=status.HTTP_201_CREATED)
            except:
                message = {'detail': 'User with this email already exists'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
