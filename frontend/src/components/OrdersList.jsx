import React from 'react';
import OrderItem from "./OrderItem";

const OrdersList = (props) => {

    const cancelOrder = (order) => {
        props.socket.send(JSON.stringify({
            'type': 'cancel',
            'order_id': order.id
        }))
    }

    return (
        <div>
            {props.orders.map(order => (
                <OrderItem cancel={cancelOrder} order={order} key={order.id}/>
            ))}
        </div>
    );
};

export default OrdersList;