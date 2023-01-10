import React, {useState, useEffect} from "react";
import AssetPairItem from "./AssetPairItem";

import axios from "axios";
import {Link} from "react-router-dom";

const AssetPairsList = (props) => {
    const [assetPairs, setAssetPairs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8001/api/asset-pairs/')
            .then(response => {
                setAssetPairs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {assetPairs.map(assetPair => (
                <AssetPairItem asset_pair={assetPair} key={assetPair.id}/>
            ))}
        </div>
    )

}

export default AssetPairsList;