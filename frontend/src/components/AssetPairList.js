import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
// import AssetPairCard from './AssetPairCard';

const AssetPairsList = () => {
    const [assetPairs, setAssetPairs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8002/api/asset-pairs/')
            .then(response => {
                setAssetPairs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <textarea id="chat-log" cols="100" rows="20"></textarea><br></br>
            <input id="chat-message-input" type="text" size="100"></input><br></br>
            <input id="chat-message-submit" type="button" value="Send"></input>

            <MyComponent/>
            {assetPairs.map(assetPair => (
                <div key={assetPair.id}>
                    <h3>{assetPair.name}</h3>
                    <h5>
                        <a href={`/asset-pairs/${assetPair.id}`}>{assetPair.base_asset.symbol}/{assetPair.quote_asset.symbol}</a>
                    </h5>

                </div>
            ))}
        </div>
    );
};

export default AssetPairsList;
function MyComponent() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        // Connect to the websocket server
        const ws = new WebSocket("ws://" + 'localhost:8002' + "/ws/orders/");

        // Set up event handlers for the websocket events
        ws.onopen = () => {
            console.log('Websocket connection opened');
        };
        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            document.querySelector('#chat-log').value += (data.message + '\n');
        };

        ws.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function (e) {
            if (e.keyCode === 13) {  // enter, return
                document.querySelector('#chat-message-submit').click();
            }
        };

        document.querySelector('#chat-message-submit').onclick = function (e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            ws.send(JSON.stringify({
                'user': 1,
                'asset_pair': 1,
                'order_type': 'buy',
                'price': 555,
                'quantity':222,
                'status': 'pending'
            }));
            messageInputDom.value = '';
        };
        ws.onerror = error => {
            console.log(`Websocket error: ${error}`);
        };

        // Save the websocket object in state so we can use it later
        setSocket(ws);

        return () => {
            ws.close()
        }
    }, [])
}