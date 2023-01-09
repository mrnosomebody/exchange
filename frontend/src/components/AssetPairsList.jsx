import React, {useState, useEffect} from "react";
import AssetPairItem from "./AssetPairItem";

import axios from "axios";

const AssetPairsList = (props) => {
    const [assetPairs, setAssetPairs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/asset-pairs/')
            .then(response => {
                setAssetPairs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="">
            {assetPairs.map(assetPair => (
                <AssetPairItem asset_pair={assetPair} key={assetPair.id}></AssetPairItem>
            ))}
        </div>
    )

}

export default AssetPairsList;