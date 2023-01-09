import React, {useEffect, useState} from 'react';
import OrderItem from "./OrderItem";
import axios from "axios";
import OrderForm from "./OrderForm";

const OrdersList = (props) => {
    const [orders, setOrders] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {

        const ws = new WebSocket("ws://" + 'localhost:8000' + "/ws/orders/");

        ws.onopen = () => {
            console.log('Websocket connection opened');
        };
        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            setOrders(JSON.parse(data['message']))
        };

        ws.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };
        ws.onerror = error => {
            console.log(`Websocket error: ${error}`);
        };

        setSocket(ws);

        return () => {
            ws.close()
        }
    }, [])

    const createOrder = (newOrder) => {
        socket.send(JSON.stringify(
            newOrder
        ))
    }

    return (
        <div>
            {orders.map(order => (
                <OrderItem order={order} key={order.id}/>
            ))}
            <OrderForm create={createOrder}/>
        </div>
    );
};

export default OrdersList;