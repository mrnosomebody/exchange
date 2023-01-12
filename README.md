### Description

This is trading exchange platform that allows both http and websocket multiple connections for getting real-time data. You can
create orders for the purchase or sale of any asset represented on the exchange. The exchange gets those orders and,
using trading logic, looking for a counter order and fills the order. Interaction with the exchange occurs through a
trading terminal, which is a client in this architecture, and the exchange itself is a server.

### Features

- All orders are stored in PostgreSQL -- <u>DONE</u>
- Quotes on trading graph -- in progress
- Notification when order status changes -- in progress
- Multiple tickers(pairs of assets) -- <u>DONE</u>
- Orders table sorting -- <u>DONE</u>
- Orders pagination -- in progress
- Export orders to csv
- JWT Authentication -- <u>DONE</u>
- Cancellation of pending orders -- <u>DONE</u>
