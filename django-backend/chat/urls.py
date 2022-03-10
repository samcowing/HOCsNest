from django.urls import path

from . import views

urlpatterns = [
    path('lobby/', views.LobbyView.as_view(), name='lobby'),
    path('room/', views.RoomView.as_view(), name='room'),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room'),
]
