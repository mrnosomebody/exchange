import React, {useEffect, useState} from 'react';
import OrdersList from "../components/OrdersList";
import OrderForm from "../components/OrderForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {useParams} from "react-router-dom";
import 'react-notifications/lib/notifications.css';


import '../styles/main.css'
import '../styles/AssetPairDetail.css'

import jwt_decode from 'jwt-decode'
import Chart from "../components/Chart";
import axios from "axios";


const AssetPairDetail = (props) => {
    const [orders, setOrders] = useState([])
    const [price, setPrice] = useState(0)
    const [socket, setSocket] = useState(null)
    const {assetPairId, assetPairName} = useParams()
    const [buyOrders, setBuyOrders] = useState([])
    const [sellOrders, setSellOrders] = useState([])
    const [histData, setHistData] = useState([])

    function handleMessage(message) {
        if (message.hasOwnProperty('status_code')) {
            const code = message['status_code']
            if (code === 200) {
                NotificationManager.success(message['message'])
            } else if (code === 204) {
                NotificationManager.warning(message['message'])
            } else {
                NotificationManager.error(message['message'])
            }
        } else {
            setOrders(JSON.parse(message['message']))
            setBuyOrders(JSON.parse(message['message'])
                .filter(order =>
                    (order.status === 'pending' || order.status === 'partially_filled')
                    && order.order_type === 'buy'
                )
            )
            setSellOrders(JSON.parse(message['message'])
                .filter(order =>
                    (order.status === 'pending' || order.status === 'partially_filled')
                    && order.order_type === 'sell')
            )
        }
    }

    const handlePrice = (data) => {
        let price = data["k"]["c"]  //default binance response
        setPrice(Math.round(price * 100000) / 100000)

        const newPrice = {
            time: data["k"]["t"],
            open: data["k"]["o"],
            high: data["k"]["h"],
            low: data["k"]["l"],
            close: data["k"]["c"]
        }
        setHistData(prevHistData => [...prevHistData, newPrice])
    }


    useEffect(() => {

        const fetchTradingHistory = async () => {
            const pair = assetPairName.replace('-', '')
            const url = `https://api.binance.com/api/v3/uiKlines?symbol=${pair}&interval=5m&limit=1000`;

            const data = (await axios.get(url)).data
            let d = []

            data.map(a => {
                d.push({
                    time: a[0],
                    open: a[1],
                    high: a[2],
                    low: a[3],
                    close: a[4]
                })
            })
            // console.log(d)

            setHistData(d);
        }
        fetchTradingHistory()

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

            <NotificationContainer/>
            <div className="flex">
                <div className="left-side">
                    <h2>Sell orders</h2>
                    <div className='orders red'>
                        <OrdersList currentPair={assetPairName}
                                    orders={sellOrders}
                                    socket={socket}
                                    shortView={true}
                        />
                    </div>
                    <h2>Buy orders</h2>
                    <div className='orders green'>
                        <OrdersList currentPair={assetPairName}
                                    orders={buyOrders}
                                    socket={socket}
                                    shortView={true}
                        />
                    </div>
                    <OrderForm price={price} create={createOrder}/>
                </div>
                <div className="right-side">
                    <Chart data={histData}/>
                </div>
            </div>


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