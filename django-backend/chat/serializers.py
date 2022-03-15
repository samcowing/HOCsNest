from rest_framework import serializers
from .models import Message
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password'],
                )

        return user


    class Meta:
        model = User
        fields = ('id', 'username', 'password')


class LogInSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        user_data = UserSerializer(user).data
        for key, value in user_data.items():
            if key != 'email':
                token[key] = value
        return token


class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Message
        fields = ['user', 'message']
