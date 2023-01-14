import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from django.core.asgi import get_asgi_application

from websocket import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exchange.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        URLRouter(routing.websocket_urlpatterns)
    )

})
