from django.urls import re_path
from websockets.consumers import OrderConsumer

websocket_urlpatterns = [
    re_path(r"^ws/orders/(?P<asset_pair_id>\d+)/$", OrderConsumer.as_asgi()),
]
