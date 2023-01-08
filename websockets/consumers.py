import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from core.models import Order
from core.serializers import OrderSerializer


class OrderConsumer(AsyncWebsocketConsumer):
    groups = ('orders_group',)

    async def connect(self):
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)

        # trying to create an order
        result_message = await self.create_order(text_data_json)
        # sending a message indicating whether the creation was successfull
        await self.send(text_data=json.dumps(result_message))

        # if the creation was successfull, send everyone updated orders
        if result_message.get('status_code') == 200:
            data = await self.get_orders()

            await self.channel_layer.group_send(
                'orders_group',
                {
                    "type": "send_orders",
                    "message": data
                }
            )

    # =====================================Utility=====================================

    # Orders
    @staticmethod
    @database_sync_to_async
    def get_orders():
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return json.dumps(serializer.data)

    @staticmethod
    @database_sync_to_async
    def create_order(data):
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return {
                'status_code': 200,
                'message': 'Order was created'
            }
        return {
            'status_code': 400,
            'message': 'Unable to create order'
        }

    async def send_orders(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
