import React, {useState, useEffect, useRef} from "react"

import AssetPairsList from "./components/AssetPairsList";
import DefaultInput from "./components/UI/input/DefaultInput";
import DefaultButton from "./components/UI/button/DefaultButton";
import OrderForm from "./components/OrderForm";
import OrdersList from "./components/OrdersList";

const App = function () {


    return (
        <div className="App">
            <OrdersList/>
            <AssetPairsList/>
        </div>
    )
}

export default App;

