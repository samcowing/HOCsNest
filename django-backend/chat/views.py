from urllib import request
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User

from .serializers import MessageSerializer
from .serializers import UserSerializer
from .models import Message
from .models import Room
from .serializers import LogInSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

#user = get_user_model


def index(request):
    return render(request, 'index.html', {})

def room(request, room_name):
    return render(request, 'chatroom.html', {
        'room_name': room_name
    })



class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        r = self.request.query_params['room']

        r_id = Room.objects.raw('SELECT * from chat_room WHERE name = %s', [r])[0].id
        return Message.objects.filter(room_id=r_id)

    @classmethod
    def get_extra_actions(cls):
        return []


class LobbyView(APIView):

    def get(self, request):
        content = { 'Current room': request.query_params['room'] }
        return Response('lobby')



class RoomView(APIView):

    def get(self, request):

        if 'room' in request.query_params.keys():
            room = Room.objects.raw('SELECT * from chat_room WHERE name = %s', [request.query_params['room']])
            if len(room) > 0:
                return Response(room[0].name)
        return Response('lobby')