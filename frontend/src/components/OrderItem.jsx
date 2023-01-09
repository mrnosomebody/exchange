import React from 'react';
import '../styles/OrderItem.css'

const OrderItem = (props) => {
    const total = () => {
        return props.order.price * props.order.quantity
    }

    return (
        <div>
            <div className="order">
                <p>{props.order.price}</p>
                <p>{props.order.quantity}</p>
                <p>{total()}</p>
                <p>{props.order.order_type}</p>
            </div>
            <hr/>
        </div>
    );
};

export default OrderItem;