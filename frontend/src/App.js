import React, {useState, useEffect, useRef} from "react"

import AssetPairsList from "./components/AssetPairsList";
import DefaultInput from "./components/UI/input/DefaultInput";
import DefaultButton from "./components/UI/button/DefaultButton";

const App = function () {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const ws = new WebSocket("ws://" + 'localhost:8002' + "/ws/orders/");

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            setOrders(data)
        }
    })

    const orderPriceInputRef = useRef()
    const orderQuantityInputRef = useRef()

    const createOrder = (e) => {
        e.preventDefault()
        console.log(orderPriceInputRef.current.value)
        console.log(orderQuantityInputRef.current.value)

        // this.ws.send(JSON.stringify({
        //     'user': 1,
        //     'asset_pair': 1,
        //     'order_type': 'buy',
        //     'price': 555,
        //     'quantity': 222,
        //     'status': 'pending'
        // }));
    }

    return (
        <div className="App">
            <DefaultInput
                ref={orderPriceInputRef}
                type="text"
                placeholder="price"
            />
            <DefaultInput
                ref={orderQuantityInputRef}
                type="text"
                placeholder="quantity"
            />
            <DefaultButton onClick={createOrder}>Bum</DefaultButton>

            <AssetPairsList/>
        </div>
    )
}

export default App;

