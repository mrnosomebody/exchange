### Description

This is trading exchange platform that allows both http and websocket multiple connections for getting real-time data.
You can
create orders for the purchase or sale of any asset represented on the exchange. The exchange gets those orders and,
using trading logic, looking for a counter order and fills the order. Interaction with the exchange occurs through a
trading terminal, which is a client in this architecture, and the exchange itself is a server.

You can go to the "Market" and you'll get all available trading
pairs with its' real-time prices. All of them are being got using only 1
websocket connection. On click on any pair you get to the trading page, where you
can see all open "Buy" and "Sell" orders, as well as Your orders,
and real-time price. Also I implemented kinda trading logic, so orders might be
executed

All prices are displayed on the trading graph as well. Graph is being rendered
here using React. You can create an order, track it's status and cancel it.
You get notified whether order creation/cancellation is successfull. Also you get
notified when order is filled(executed)

### Features

- All orders are stored in PostgreSQL -- <u>DONE</u>
- Quotes on trading graph -- <u>DONE</u>
- Notification when order status changes -- <u>DONE</u>
- Multiple tickers(pairs of assets) -- <u>DONE</u>
- Orders table sorting -- <u>DONE</u>
- JWT Authentication -- <u>DONE</u>
- Cancellation of pending orders -- <u>DONE</u>
