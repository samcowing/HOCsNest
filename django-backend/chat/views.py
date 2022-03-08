from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MessageSerializer
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
