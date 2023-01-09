import React, {useState} from 'react';
import DefaultInput from "./UI/input/DefaultInput";
import DefaultButton from "./UI/button/DefaultButton";

const OrderForm = ({create}) => {
    const [order, setOrder] = useState({
        id: 0,
        user: 1,
        asset_pair: 1,
        order_type: 'buy',
        price: '',
        quantity: '',
        status: 'pending'
    })

    const createOrder = (e) => {
        e.preventDefault()
        const newOrder = {
            'user': 1,
            'asset_pair': 1,
            'order_type': 'buy',
            ...order,
            'status': 'pending'
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
            <DefaultButton onClick={createOrder}>Bum</DefaultButton>
        </div>
    );
};

export default OrderForm;