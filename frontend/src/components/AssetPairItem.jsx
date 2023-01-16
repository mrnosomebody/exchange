import React, {useEffect, useState} from 'react';
import "../styles/AssetItem.css"
import {Link} from "react-router-dom";


const AssetPairItem = (props) => {
    const assetPairId = props.asset_pair.id
    const assetPairName = props.asset_pair.base_asset.symbol + '-' + props.asset_pair.quote_asset.symbol
    const [price, setPrice] = useState(0)

    useEffect(() => {
        handlePrice(props.price)
    }, [props.price])

    const handlePrice = (price) => {
        setPrice(Math.round(price * 100000) / 100000)
    }

    return (
        <Link to={`${assetPairId}/${assetPairName}/`} className="cards">
            <div className="card card-1">
                <div className="left">
                    <p className="card__apply">
                    <span className="card__link">
                        {props.asset_pair.base_asset.name}/{props.asset_pair.quote_asset.name}
                    </span>
                    </p>
                    <h2 className="card__title">
                        {props.asset_pair.base_asset.symbol}/{props.asset_pair.quote_asset.symbol}
                    </h2>
                </div>
                <div className="right">
                    <h3>${price}</h3>
                </div>

            </div>
        </Link>
    );
};

export default AssetPairItem;

// onClick={() => props.pairName(props.asset_pair.base_asset.name, props.asset_pair.quote_asset.name)}