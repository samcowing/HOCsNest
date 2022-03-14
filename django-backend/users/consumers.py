import json
from asgiref.sync import sync_to_async, async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.conf import settings
from django.contrib.auth import get_user_model

from channels.auth import channel_session_user_from_http

from .models import NewUser


user = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def connect(self, event):
        self.user = self.scope["user"]
        print(self.user)
