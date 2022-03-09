from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Message



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Message
        fields = ['user', 'message']
