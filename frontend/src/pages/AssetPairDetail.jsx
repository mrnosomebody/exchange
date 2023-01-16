import React, {useEffect, useState} from 'react';
import OrdersList from "../components/OrdersList";
import OrderForm from "../components/OrderForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useParams} from "react-router-dom";
import 'react-notifications/lib/notifications.css';


import '../styles/main.css'
import '../styles/AssetPairDetail.css'

import jwt_decode from 'jwt-decode'


const AssetPairDetail = () => {
    const [orders, setOrders] = useState([])
    const [price, setPrice] = useState(0)
    const [socket, setSocket] = useState(null)
    const {assetPairId, assetPairName} = useParams()
    const [buyOrders, setBuyOrders] = useState([])
    const [sellOrders, setSellOrders] = useState([])

    function handleMessage(message) {
        if (message.hasOwnProperty('status_code')) {
            const code = message['status_code']
            if (code == 200) {
                NotificationManager.success(message['message'])
            } else {
                NotificationManager.error(message['message'])
            }
        } else {
            setOrders(JSON.parse(message['message'])
                .filter(order => order.status !== 'cancelled')
            )
            setBuyOrders(JSON.parse(message['message'])
                .filter(order => order.status !== 'cancelled' && order.order_type === 'buy')
            )
            setSellOrders(JSON.parse(message['message'])
                .filter(order => order.status !== 'cancelled' && order.order_type === 'sell')
            )
        }
    }

    const handlePrice = (data) => {
        let price = data["k"]["c"]  //default binance response
        setPrice(Math.round(price * 100000) / 100000)
    }

    useEffect(() => {
        const tradingPair = assetPairName.replace('-', '').toLowerCase()
        const ws = new WebSocket(`ws://localhost:8001/ws/orders/${assetPairId}/`);
        const ws_binance = new WebSocket(`wss://stream.binance.com:443/ws/${tradingPair}@kline_5m`);

        ws.onopen = () => {
            ws.send(JSON.stringify({
                'type': 'initial',
                'asset_pair_id': assetPairId
            }))
        };

        ws_binance.onopen = () => {
            console.log('Opened to binance')
        };

        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            handleMessage(data)
        };

        ws_binance.onmessage = function (e) {
            const data = JSON.parse(e.data);
            handlePrice(data)
        };

        ws.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };

        ws.onerror = error => {
            console.log(`Websocket error: ${error}`);
        };

        ws_binance.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };

        ws_binance.onerror = error => {
            console.log(`Websocket error: ${error}`);
        };

        setSocket(ws);

        return () => {
            ws.close()
        }
    }, [])

    const get_user_id = () => {
        const decoded = jwt_decode(localStorage.getItem('accessToken'))
        return decoded.user_id
    }

    const createOrder = (newOrder) => {
        socket.send(JSON.stringify({
                'type': 'create',
                'user': get_user_id(),
                'asset_pair': assetPairId,
                ...newOrder
            }
        ))
    }

    return (
        <div className="main">
            <h1>{assetPairName} - ${price}</h1>
            <h2>Sell</h2>
            <NotificationContainer/>
            <OrdersList currentPair={assetPairName}
                        orders={sellOrders}
                        socket={socket}
                        shortView={true}
            />
            <h2>Buy</h2>
            <OrdersList currentPair={assetPairName}
                        orders={buyOrders}
                        socket={socket}
                        shortView={true}
            />
            <OrderForm create={createOrder}/>

            <h2>My orders</h2>
            <div className="my-orders">
                <OrdersList currentPair={assetPairName}
                            orders={orders.filter(order => order.user === get_user_id())}
                            socket={socket}
                            shortView={false}
                />
            </div>
        </div>
    );
};

export default AssetPairDetail;