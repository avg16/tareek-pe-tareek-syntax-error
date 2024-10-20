import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chatsapp.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            # chatapp.routing.websocket_urlpatterns + groupchatapp.routing.websocket_urlpattern
            chatsapp.routing.websocket_urlpatterns
        )
    ),
})
