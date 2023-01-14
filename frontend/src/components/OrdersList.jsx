import React from 'react';
import OrderItem from "./OrderItem";

import '../styles/OrderItem.css'
import OrderItemShort from "./OrderItemShort";

const OrdersList = (props) => {

    const cancelOrder = (order) => {
        props.socket.send(JSON.stringify({
            'type': 'cancel',
            'order_id': order.id
        }))
    }

    return (
        <div>
            {
                props.shortView === true
                    ? <div className="tbl-header small">
                            <table className="table" cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                <tr>
                                    <th>Side</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                            </table>
                        <div className="tbl-content-small">
                            {props.orders.map(order => (
                                <OrderItemShort currentPair={props.currentPair} cancel={cancelOrder} order={order}
                                                key={order.id}/>
                            ))}
                        </div>

                    </div>
                    : <div className="tbl-header">
                            <table cellPadding="0" cellSpacing="0" border="0">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Creation time</th>
                                    <th>Change time</th>
                                    <th>Status</th>
                                    <th>Side</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Instrument</th>
                                    <th>Cancel</th>
                                </tr>
                                </thead>
                            </table>
                        <div className="tbl-content">
                            {props.orders.map(order => (
                                <OrderItem currentPair={props.currentPair} cancel={cancelOrder} order={order}
                                           key={order.id}/>
                            ))}
                        </div>
                    </div>
            }
        </div>
    );
};

export default OrdersList;