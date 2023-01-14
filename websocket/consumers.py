import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.shortcuts import get_object_or_404

from core.models import Order, AssetPair
from core.serializers import OrderSerializer, AssetPairSerializer


class AssetPairsConsumer(AsyncWebsocketConsumer):
    groups = ('asset_pairs_group',)

    async def connect(self):
        await self.accept()

        data = await self.get_asset_pairs()

        await self.channel_layer.group_send(
            'asset_pairs_group',
            {
                'type': 'send_pairs',
                'message': data
            }
        )

    async def send_pairs(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({"message": message}))

    @staticmethod
    @database_sync_to_async
    def get_asset_pairs():
        pairs = AssetPair.objects.all()
        serializer = AssetPairSerializer(pairs, many=True)
        return json.dumps(serializer.data)


class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.asset_pair_id = self.scope["url_route"]["kwargs"]["asset_pair_id"]
        self.orders_group_name = f'orders_{self.asset_pair_id}'

        await self.channel_layer.group_add(self.orders_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.orders_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        request_type = text_data_json.get('type')

        if request_type == 'create':
            # trying to create an order
            result_message = await self.create_order(text_data_json)
            # sending a message indicating whether the creation was successfull
            await self.send(text_data=json.dumps(result_message))

            # if the creation was successfull, send everyone updated orders
            if result_message.get('status_code') == 200:
                await self.send_current_orders()

        elif request_type == 'cancel':
            # trying to delete an order
            result_message = await self.cancel_order(text_data_json)
            # sending a message indicating whether the cancellation was successfull
            await self.send(text_data=json.dumps(result_message))

            # if the cancellation was successfull, send everyone updated orders
            if result_message.get('status_code') == 200:
                await self.send_current_orders()

        elif request_type == 'initial':
            await self.send_current_orders()

    # =====================================Utility=====================================

    # Orders
    @database_sync_to_async
    def get_orders(self):
        orders = Order.objects.filter(asset_pair=self.asset_pair_id)
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

    @staticmethod
    @database_sync_to_async
    def cancel_order(data):
        order = get_object_or_404(Order, id=data.get('order_id'))
        if order:
            order.status = 'cancelled'
            order.save()
            return {
                'status_code': 200,
                'message': 'Order was cancelled'
            }
        return {
            'status_code': 200,
            'message': 'Order does not exist'
        }

    async def send_orders(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))

    async def send_current_orders(self):
        data = await self.get_orders()

        await self.channel_layer.group_send(
            self.orders_group_name,
            {
                "type": "send_orders",
                "message": data
            }
        )