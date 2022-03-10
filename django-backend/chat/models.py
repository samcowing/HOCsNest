from django.db import models
from django.conf import settings


# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=50, unique=True)


class Message(models.Model):
    #TODO - implement User sessions and auth
    message = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="messages", on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
