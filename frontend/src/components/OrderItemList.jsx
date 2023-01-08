import React, {useEffect, useState} from 'react';
import OrderItem from "./OrderItem";
import axios from "axios";

const OrderItemList = (props) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const ws = new WebSocket("ws://" + 'localhost:8002' + "/ws/orders/");

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setOrders(data)
        }
    })

    function createOrder() {
        this.ws.send(JSON.stringify({
            'user': 1,
            'asset_pair': 1,
            'order_type': 'buy',
            'price': 555,
            'quantity': 222,
            'status': 'pending'
        }));
    }

    return (
        <div>
            {orders.map(order => (
                <OrderItem order={order}/>
            ))}
        </div>
    );
};

export default OrderItemList;