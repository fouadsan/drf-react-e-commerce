from rest_framework import generics

from .models import Test
from .serializers import TestSerializer


class TestList(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
