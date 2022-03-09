from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Message



class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create_user(
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
