from rest_framework import serializers
from .models import Message
from django.contrib.auth import get_user_model

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




class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Message
        fields = ['user', 'message']
