# import json
#
# from channels.db import database_sync_to_async
# from channels.generic.websocket import AsyncJsonWebsocketConsumer, AsyncWebsocketConsumer
# from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
# from djangochannelsrestframework.mixins import ListModelMixin, CreateModelMixin
#
# from core import models, serializers
#
# class OrderConsumer(ListModelMixin, CreateModelMixin, GenericAsyncAPIConsumer):
#     queryset = models.Order.objects.all()
#     serializer_class = serializers.OrderSerializer
import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from asgiref.sync import sync_to_async

from core.models import Order
from core.serializers import OrderSerializer


class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.orders_group_name = 'orders_group'

        await self.channel_layer.group_add(
            self.orders_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.orders_group_name,
            self.channel_name
        )

    @staticmethod
    def get_orders():
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return json.dumps(serializer.data)

    @staticmethod
    def add_order(data):
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return True
        return False

    # Receive message from WebSocket
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)

        await sync_to_async(self.add_order)(text_data_json)
        data = await sync_to_async(self.get_orders)()

        # Send message to room group
        await self.channel_layer.group_send(
            self.orders_group_name, {"type": "chat_message", "message": data}
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
