from django.shortcuts import render

from rest_framework import viewsets
from django.contrib.auth.models import User

from .serializers import MessageSerializer
from .serializers import UserSerializer
from .models import Message

def index(request):
    return render(request, 'index.html', {})

def room(request, room_name):
    return render(request, 'chatroom.html', {
        'room_name': room_name
    })



class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
