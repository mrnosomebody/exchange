import React from 'react';
import '../styles/OrderItem.css'
import DefaultButton from "./UI/button/DefaultButton";

const OrderItem = (props) => {
    const total = () => {
        return props.order.price * props.order.quantity
    }

    return (
        <div>
            <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                <tr>
                    <td>{props.order.id}</td>
                    <td>{props.order.created_at}</td>
                    <td>{props.order.updated_at}</td>
                    <td>{props.order.status}</td>
                    <td>{props.order.order_type}</td>
                    <td>{props.order.price}</td>
                    <td>{total()}</td>
                    <td>{props.currentPair}</td>
                    <DefaultButton onClick={() => props.cancel(props.order)}>Cancel</DefaultButton></tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderItem;

