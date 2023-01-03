from django.urls import path
from core.consumers import OrderConsumer, TradeConsumer

websocket_urlpatterns = [
    path('ws/orders/', OrderConsumer.as_asgi()),
    path('ws/trades/', TradeConsumer.as_asgi()),
]