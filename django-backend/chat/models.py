from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Message(models.Model):
    #TODO - implement User sessions and auth
    #username = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE)
    username = models.CharField(max_length=50)
    message = models.TextField()
