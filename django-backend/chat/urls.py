from django.urls import path

from . import views

urlpatterns = [
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room'),
]
