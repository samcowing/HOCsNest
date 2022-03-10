import json
from asgiref.sync import sync_to_async, async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.conf import settings
from django.contrib.auth import get_user_model

from .models import Message
from .models import Room

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    rooms = ['home', 'lounge', 'games']

    def create_room(self, name):
        new_room = Room.objects.create(name=name)
        new_room.save()
        return new_room

    def create_chat(self, room, user, message):
        new_msg = Message.objects.create(room=room, user=user, message=message)
        new_msg.save()
        return new_msg

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Create rooms in backend if they do not already exist
        all_room_obj = Room.objects.raw('SELECT * from chat_room')

        for room in self.rooms:
            if room not in [r.name for r in all_room_obj]:
                self.create_room(room)

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

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Save message to PostgreSQL database
        # For testing purposes
        # TODO - Use logged in user
        current_user = User.objects.raw('SELECT * from users_newuser')[1]
        new_msg = self.create_chat(self.current_room, current_user, message)

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'username': new_msg.user.username,
            'message': new_msg.message,
        }))
