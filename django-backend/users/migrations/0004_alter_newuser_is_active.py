# Generated by Django 4.0.3 on 2022-03-11 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_rename_user_name_newuser_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
