from django.db import models
from django.conf import settings
from users.models import NewUser


# Create your models here.

# NewUser(AbstractBaseUser, PermissionsMixin):
class Lounge(models.Model):
    name = models.CharField(max_length=50, unique=True)
    members = models.ManyToManyField(NewUser)

class Room(models.Model):
    name = models.CharField(max_length=50, unique=True)
    lounge = models.ForeignKey(Lounge, on_delete=models.CASCADE)


class Message(models.Model):
    #TODO - implement User sessions and auth
    message = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="messages", on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
