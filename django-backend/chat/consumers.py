import json
from asgiref.sync import sync_to_async, async_to_sync
from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
from django.contrib.auth import get_user_model

from channels.generic.websocket import WebsocketConsumer
from channels.auth import login
from channels.db import database_sync_to_async

from .models import Lounge
from .models import Room
from .models import Message


class ChatConsumer(WebsocketConsumer):

    rooms = ['home', 'lounge', 'games']
    lounges = ['public']

    def create_lounge(self, name):
        new_lounge = Lounge.objects.create(name=name)
        new_lounge.save()
        return new_lounge

    def create_room(self, name, lounge):
        new_room = Room.objects.create(name=name, lounge=lounge)
        new_room.save()
        return new_room

    def create_chat(self, room, user, message):
        new_msg = Message.objects.create(room=room, user=user, message=message)
        new_msg.save()
        return new_msg

    def connect(self):
        print("Authentication successful")
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print(f'user: { self.scope["user"] }')
        print(f'Anonymous: { self.scope["user"].is_anonymous }')
        print(f'Authenticated: { self.scope["user"].is_authenticated }')

        if self.scope['user'].is_authenticated:
            async_to_sync(login)(self.scope, self.scope['user'])
            database_sync_to_async(self.scope['session'].save)()

            all_lounge_arr = Lounge.objects.raw('SELECT * from chat_lounge')
            all_room_arr = Room.objects.raw('SELECT * from chat_room')

            # Create default lounges if they do not exist
            for lounge in self.lounges:
                if lounge not in [l.name for l in all_lounge_arr]:
                    self.create_lounge(lounge)

            lounge_obj = Lounge.objects.raw('SELECT * FROM chat_lounge WHERE name = %s', [self.lounges[0]])
            self.current_lounge = lounge_obj[0]

            # Create default rooms if they do not exist
            for room in self.rooms:
                if room not in [r.name for r in all_room_arr]:
                    self.create_room(room, self.current_lounge)

            room_obj = Room.objects.raw('SELECT * from chat_room WHERE name = %s', [self.room_name])

            if len(room_obj) > 0:
                self.current_room = room_obj[0]
            else:
                print('ERROR: Room does not exist')
                return -1

            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            self.accept()
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'accept_message',
                    'username': self.scope['user'].username,
                    'user_id': self.scope['user'].id,
                    'email': self.scope['user'].email,
                }
            )
            print("CONNECTION ACCEPTED")
        else:
            print("\nUnauthorized\n")

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']

        async_to_sync(login)(self.scope, self.scope['user'])
        database_sync_to_async(self.scope['session'].save)()

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )


    def accept_message(self, event):
        self.send(text_data=json.dumps({
            'type': 'accept',
            'username': event['username'],
            'user_id': event['user_id'],
            'email': event['email'],
        }))


    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Save message to PostgreSQL database
        # For testing purposes
        new_msg = self.create_chat(self.current_room, self.scope['user'], message)

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type': 'message',
            'username': new_msg.user.username,
            'message': new_msg.message,
        }))
