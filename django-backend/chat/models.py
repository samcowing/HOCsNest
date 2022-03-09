from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=50)


class Message(models.Model):
    #TODO - implement User sessions and auth
    message = models.TextField()
    user = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
