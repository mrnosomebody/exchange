from channels.db import database_sync_to_async

from api.models import Order


@database_sync_to_async
def perform_trades(self) -> list:
    messages = []
    orders = Order.objects.filter(asset_pair=self.asset_pair_id)

    buy_orders = orders.filter(order_type='buy') \
        .exclude(status__in=['cancelled', 'filled']).order_by('-price')
    sell_orders = orders.filter(order_type='sell') \
        .exclude(status__in=['cancelled', 'filled']).order_by('price')

    for buy_order in buy_orders:
        for sell_order in sell_orders:

            if buy_order.price == sell_order.price and buy_order.user != sell_order.user:

                if buy_order.quantity == sell_order.quantity:
                    buy_order.status = 'filled'
                    sell_order.status = 'filled'

                    buy_order.save()
                    sell_order.save()

                    messages.append({
                        'status_code': 204,
                        'message': 'Order filled'
                    })

                    break

                elif buy_order.quantity > sell_order.quantity:
                    buy_order.quantity -= sell_order.quantity
                    buy_order.status = 'partially_filled'
                    sell_order.status = 'filled'

                    buy_order.save()
                    sell_order.save()

                    messages.append({
                        'status_code': 204,
                        'message': 'Order partially_filled'
                    })

                elif buy_order.quantity < sell_order.quantity:
                    sell_order.quantity -= buy_order.quantity
                    sell_order.status = 'partially_filled'
                    buy_order.status = 'filled'

                    buy_order.save()
                    sell_order.save()

                    messages.append({
                        'status_code': 204,
                        'message': 'Order partially_filled'
                    })
    return messages
