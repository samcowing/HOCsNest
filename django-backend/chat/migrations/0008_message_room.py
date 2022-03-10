# Generated by Django 4.0.3 on 2022-03-09 22:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_remove_message_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='room',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='chat.room'),
            preserve_default=False,
        ),
    ]
