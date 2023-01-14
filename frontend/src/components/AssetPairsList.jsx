import React, {useEffect, useState} from "react";
import AssetPairItem from "./AssetPairItem";

import '../styles/main.css'

const AssetPairsList = (props) => {
    const [assetPairs, setAssetPairs] = useState([])
    const [socket, setSocket] = useState(null)
    const [prices, setPrices] = useState([])


    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8001/ws/asset-pairs/`)

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
        <div className='main'>
            {assetPairs.map(assetPair => (
                <AssetPairItem asset_pair={assetPair} key={assetPair.id}/>
            ))}
        </div>
    )

}

export default AssetPairsList;