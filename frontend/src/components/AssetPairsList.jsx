import React, {useEffect, useState} from "react";
import AssetPairItem from "./AssetPairItem";

import '../styles/main.css'

const AssetPairsList = (props) => {
    const [assetPairs, setAssetPairs] = useState([])
    const [socket, setSocket] = useState(null)
    const [prices, setPrices] = useState({})
    let streams = []


    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8001/ws/asset-pairs/`)


        ws.onopen = () => {
            console.log('Connection opened')
        }

        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            const d = JSON.parse(data['message'])


            for (const pair in d) {
                console.log((d[pair].base_asset.symbol + d[pair].quote_asset.symbol).toLowerCase())
                streams.push(
                    (d[pair].base_asset.symbol + d[pair].quote_asset.symbol).toLowerCase() + "@kline_1s"
                )
            }
            setAssetPairs(d)

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