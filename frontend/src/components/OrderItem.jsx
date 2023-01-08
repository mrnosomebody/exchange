import React from 'react';
import '../styles/OrderItem.css'

const OrderItem = (props) => {
    return (
        <div className="order">
            <p>{props.order.price}</p>
            <p>{props.order.quantity}</p>
            <p>{props.order.price} * {props.order.quantity}</p>
        </div>
    );
};

export default OrderItem;