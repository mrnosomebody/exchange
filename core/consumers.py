from asgiref.sync import async_to_sync
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer.generics import (ObserverModelInstanceMixin, action)
from rest_framework.utils import json

from core.models import Order, Trade
from core.serializers import TradeSerializer


class OrderConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        # Parse the incoming message data
        data = json.loads(text_data)
        # Check the message type
        if data['type'] == 'new.order':
            # Process the new order
            order = Order.objects.create(
                user=self.scope['user'],
                asset_pair_id=data['asset_pair'],
                order_type=data['order_type'],
                price=data['price'],
                quantity=data['quantity'],
                status='pending'
            )
            async_to_sync(process_order)(order)


class TradeConsumer(ObserverModelInstanceMixin, GenericAsyncAPIConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        # Parse the incoming message data
        data = json.loads(text_data)
        # Check the message type
        if data['type'] == 'trade.notification':
            # Retrieve the trade and send it to the user
            trade = Trade.objects.get(pk=data['trade_id'])
            self.send(text_data=json.dumps({
                'type': 'trade.notification',
                'trade': TradeSerializer(trade).data
            }))


def process_order(order):
    # Check if the order can be matched with any existing orders
    matching_orders = Order.objects.filter(
        asset_pair=order.asset_pair,
        order_type=order.order_type,
        status='open',
        price=order.price
    )
    # Iterate over the matching orders and create trades
    for matching_order in matching_orders:
        trade_quantity = min(order.quantity, matching_order.quantity)
        Trade.objects.create(
            asset_pair=order.asset_pair,
            quantity=trade_quantity,
            price=order.price,
            buyer=order.user,
            seller=matching_order.user
        )
        # Update the order quantities
        order.quantity -= trade_quantity
        matching_order.quantity -= trade_quantity
        # Save the updated orders
        order.save()
        matching_order.save()
        # Send notifications to the users
        async_to_sync(notify_users)(order.user, matching_order.user, trade_quantity, order.price)
    # If the order was not fully filled, add it to the open orders
    if order.quantity > 0:
        order.status = 'open'
        order.save()


def notify_users(buyer, seller, quantity, price):
    # Send a notification to the buyer
    async_to_sync(send_notification)(buyer, f'You bought {quantity} units of asset pair at {price}')
    # Send a notification to the seller
    async_to_sync(send_notification)(seller, f'You sold {quantity} units of asset pair at {price}')


def send_notification():
    ...
