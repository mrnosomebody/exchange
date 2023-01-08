import React from 'react';
import "../styles/AssetItem.css"
import DefaultButton from "./UI/button/DefaultButton";


const AssetPairItem = (props) => {
    return (
        <div className="cards">
            <div className="card card-1">
                <div className="card__icon"><i className="fas fa-bolt"></i></div>
                <h2 className="card__title">
                    {props.asset_pair.base_asset.symbol}/{props.asset_pair.quote_asset.symbol}
                </h2>
                <p className="card__apply">
                    <span className="card__link">
                        {props.asset_pair.base_asset.name}/{props.asset_pair.quote_asset.name}
                    </span>
                </p>
            </div>
        </div>

        // <div className="asset_pair_card">
        //     <div className="asset_pair_content">
        //         <div className="asset_pair_symbols">
        //             {props.asset_pair.base_asset.symbol}/{props.asset_pair.quote_asset.symbol}
        //         </div>
        //         <div className="asset_pair_description">
        //             {props.asset_pair.base_asset.name}/{props.asset_pair.quote_asset.name}
        //         </div>
        //     </div>
        // </div>
    );
};

export default AssetPairItem;