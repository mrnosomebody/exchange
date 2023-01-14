import React, {useState} from 'react';
import DefaultInput from "./UI/input/DefaultInput";
import DefaultButton from "./UI/button/DefaultButton";

const OrderForm = ({create}) => {
    const [order, setOrder] = useState({
        order_type: '',
        price: '',
        quantity: '',
        status: 'pending'
    })

    const createOrderBuy = (e) => {
        e.preventDefault()
        const newOrder = {
            ...order, order_type: 'buy'
        }
        create(newOrder)
    }

    const createOrderSell = (e) => {
        e.preventDefault()
        const newOrder = {
            ...order, order_type: 'sell'
        }
        create(newOrder)
    }

    return (
        <div>
            <DefaultInput
                value={order.price}
                onChange={e => setOrder({...order, price: e.target.value})}
                type="number"
                pattern="[0-9]*\.?[0-9]*"
                placeholder="price"
            />
            <DefaultInput
                value={order.quantity}
                onChange={e => setOrder({...order, quantity: e.target.value})}
                type="number"
                pattern="[0-9]*\.?[0-9]*"
                placeholder="quantity"
            />
            <DefaultButton onClick={createOrderBuy}>Buy</DefaultButton>
            <DefaultButton onClick={createOrderSell}>Sell</DefaultButton>
        </div>
    );
};

export default OrderForm;