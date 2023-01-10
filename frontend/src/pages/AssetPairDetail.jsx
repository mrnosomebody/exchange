import React, {useEffect, useState} from 'react';
import OrdersList from "../components/OrdersList";
import OrderForm from "../components/OrderForm";
import {useParams} from "react-router-dom";
import '../styles/AssetPageDetail.css'

const AssetPairDetail = () => {
    const [orders, setOrders] = useState([])
    const [socket, setSocket] = useState(null)
    const {assetPairId} = useParams()

    const handleMessage = (message) => {
        if (message.hasOwnProperty('status_code')) {
            console.log(message)
        } else {
            setOrders(JSON.parse(message['message']).filter(order => order.status !== 'cancelled'))
        }
    }

    useEffect(() => {

        const ws = new WebSocket("ws://" + 'localhost:8001' + "/ws/orders/");

        ws.onopen = () => {
            ws.send(JSON.stringify({
                'type': 'initial',
                'asset_pair_id': assetPairId
            }))
        };
        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            handleMessage(data)
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
    }, [assetPairId])

    const createOrder = (newOrder) => {
        socket.send(JSON.stringify({
                'type': 'create',
                ...newOrder
            }
        ))
    }

    return (
        <div>
            <div className="main">
                <h1>{assetPairId}</h1>
                <OrdersList orders={orders} socket={socket}/>
                <OrderForm create={createOrder}/>
            </div>
        </div>
    );
};

export default AssetPairDetail;