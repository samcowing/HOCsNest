from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import chat.routing
from chat.channelsmiddleware import JWTAuthMiddlewareStack

application = ProtocolTypeRouter({
    'websocket': JWTAuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
