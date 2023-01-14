import React, {useContext, useEffect, useState} from 'react';
import OrdersList from "../components/OrdersList";
import OrderForm from "../components/OrderForm";
import {useParams} from "react-router-dom";
import '../styles/main.css'
import {Context} from "../index";
import jwt_decode from 'jwt-decode'


const AssetPairDetail = () => {
    const [orders, setOrders] = useState([])
    const [socket, setSocket] = useState(null)
    const {assetPairId, assetPairName} = useParams()
    const {store} = useContext(Context)

    const handleMessage = (message) => {
        if (message.hasOwnProperty('status_code')) {
            console.log(message)
        } else {
            setOrders(JSON.parse(message['message']).filter(order => order.status !== 'cancelled'))
        }
    }

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8001/ws/orders/${assetPairId}/`);

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
        <div>
            <div className="main">
                <h1>{assetPairName}</h1>
                <OrdersList currentPair={assetPairName}
                            orders={orders}
                            socket={socket}
                            shortView={true}
                />
            </div>
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