from django.urls import re_path
from websockets.consumers import OrderConsumer

websocket_urlpatterns = [
    re_path(r"^ws/orders/$", OrderConsumer.as_asgi()),
]
