from .models import Account
from rest_framework import serializers
# from django.contrib.auth.models import User


# class UserSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField(read_only=True)
#     is_admin = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = User
#         fields = ('id', 'email', 'name', 'is_admin')

#     def get_name(self, obj):
#         return obj.first_name

#     def get_is_admin(self, obj):
#         return obj.is_staff


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'password', 'is_admin')

    def get_is_admin(self, obj):
        return obj.is_staff

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
