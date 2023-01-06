import os

from channels.routing import ProtocolTypeRouter, URLRouter
from websocket.middlewares import WebSocketJWTAuthMiddleware

from django.core.asgi import get_asgi_application

import core.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exchange.settings')
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "ws": URLRouter(
        core.routing.websocket_urlpatterns
    )
})
