// import React, {useEffect, useState} from 'react';
// import {useParams} from 'react-router-dom';
// // import {fetchAssetPairData} from '../api';
// // import TradingGraph from './TradingGraph';
// // import OrderList from './OrderList';
// // import QuoteList from './QuoteList';
//
// function AssetPairPage() {
//     // const {assetPairId} = useParams();
//     // const [assetPairData, setAssetPairData] = useState(null);
//     //
//     // useEffect(() => {
//     //     fetchAssetPairData(assetPairId).then(data => setAssetPairData(data));
//     // }, [assetPairId]);
//     //
//     // if (!assetPairData) {
//     //     return <div>Loading...</div>;
//     // }
//
//     return (
//
//
//         <div className="asset-pair-page">
//             {/*<TradingGraph data={assetPairData.tradingGraphData}/>*/}
//             {/*<OrderList orders={assetPairData.orders}/>*/}
//             {/*<QuoteList quotes={assetPairData.quotes}/>*/}
//             <textarea id="chat-log" cols="100" rows="20"></textarea><br></br>
//             <input id="chat-message-input" type="text" size="100"></input><br></br>
//             <input id="chat-message-submit" type="button" value="Send"></input>
//
//             <MyComponent/>
//         </div>
//
//     );
// }
//
// export default AssetPairPage
//
// function MyComponent() {
//     const [socket, setSocket] = useState(null);
//
//     useEffect(() => {
//
//         // Connect to the websocket server
//         const ws = new WebSocket("ws://" + 'localhost:8002' + "/ws/asset-pairs/");
//
//         // Set up event handlers for the websocket events
//         ws.onopen = () => {
//             console.log('Websocket connection opened');
//         };
//         ws.onmessage = function (e) {
//             const data = JSON.parse(e.data);
//             document.querySelector('#chat-log').value += (data.message + '\n');
//         };
//
//         ws.onclose = function (e) {
//             console.error('Chat socket closed unexpectedly');
//         };
//
//         document.querySelector('#chat-message-input').focus();
//         document.querySelector('#chat-message-input').onkeyup = function (e) {
//             if (e.keyCode === 13) {  // enter, return
//                 document.querySelector('#chat-message-submit').click();
//             }
//         };
//
//         document.querySelector('#chat-message-submit').onclick = function (e) {
//             const messageInputDom = document.querySelector('#chat-message-input');
//             const message = messageInputDom.value;
//             ws.send(JSON.stringify({
//                 'message': message
//             }));
//             messageInputDom.value = '';
//         };
//         ws.onerror = error => {
//             console.log(`Websocket error: ${error}`);
//         };
//
//         // Save the websocket object in state so we can use it later
//         setSocket(ws);
//
//         return () => {
//             ws.close()
//         }
//     }, [])
// }