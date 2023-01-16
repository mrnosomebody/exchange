import React, {useEffect, useState} from "react";
import AssetPairItem from "./AssetPairItem";

import '../styles/main.css'

const AssetPairsList = (props) => {
    const [assetPairs, setAssetPairs] = useState([])
    const [socket, setSocket] = useState(null)
    const [prices, setPrices] = useState({})


    useEffect(() => {
        let streams = ["btcusdt@kline_1s", "twtusdt@kline_1s", "ethusdt@kline_1s"]
        const ws = new WebSocket(`ws://localhost:8001/ws/asset-pairs/`)

        const ws_binance = new WebSocket("wss://stream.binance.com:9443/ws/" + streams.join('/'))

        ws_binance.onopen = () => {
            console.log('Opened to bstream')
        };
        ws_binance.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };

        ws_binance.onerror = error => {
            console.log(`Websocket error: ${error}`);
        };

        ws_binance.onmessage = function (e) {
            const data = JSON.parse(e.data);
            let pair = data["k"]["s"]
            setPrices(prevPrices => {
                const newPrices = {...prevPrices};
                newPrices[pair] = data["k"]["c"];
                return newPrices;
            });
        };

        ws.onopen = () => {
            console.log('Connection opened')
        }

        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            setAssetPairs(JSON.parse(data['message']))
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


    return (

        <div className="main">
            {assetPairs.map(assetPair => {
                const pairName = `${assetPair.base_asset.symbol}${assetPair.quote_asset.symbol}`;
                return (
                    <div>
                        <AssetPairItem price={prices[pairName]} asset_pair={assetPair} key={assetPair.id}/>
                    </div>
                );
            })}
        </div>
    )

}

export default AssetPairsList;