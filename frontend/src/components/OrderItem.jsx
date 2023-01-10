import React from 'react';
import '../styles/OrderItem.css'
import DefaultButton from "./UI/button/DefaultButton";

const OrderItem = (props) => {
    const total = () => {
        return props.order.price * props.order.quantity
    }

    return (
        <div>
            <hr/>
            <div className="order">
                <p>{props.order.id}</p>
                <p>{props.order.price}</p>
                <p>{props.order.quantity}</p>
                <p>{total()}</p>
                <p>{props.order.order_type}</p>
                <DefaultButton onClick={() => props.cancel(props.order)}>Cancel</DefaultButton>
            </div>

        </div>
    );
};

export default OrderItem;