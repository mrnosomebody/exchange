from django.urls import re_path
from websocket.consumers import AssetPairsConsumer, OrderConsumer

websocket_urlpatterns = [
    re_path(r"^ws/asset-pairs/$", AssetPairsConsumer.as_asgi()),
    re_path(r"^ws/orders/(?P<asset_pair_id>\d+)/$", OrderConsumer.as_asgi()),
]
