from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_admin')

    def get_name(self, obj):
        return obj.first_name

    def get_is_admin(self, obj):
        return obj.is_staff
