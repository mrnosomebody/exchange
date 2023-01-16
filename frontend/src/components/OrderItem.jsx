import React from 'react';
import '../styles/OrderItem.css'
import DefaultButton from "./UI/button/DefaultButton";

const OrderItem = (props) => {
    let shortCreatedAt = new Date(props.order.created_at).toLocaleString();
    let shortUpdatedAt = new Date(props.order.updated_at).toLocaleString();
    const total = () => {
        return props.order.price * props.order.quantity
    }

    return (
        <div>
            <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                <tr className="tr">
                    <td>{props.order.id}</td>
                    <td>{shortCreatedAt}</td>
                    <td>{shortUpdatedAt}</td>
                    <td>{props.order.status}</td>
                    <td>{props.order.order_type}</td>
                    <td>{props.order.price}</td>
                    <td>{total()}</td>
                    <td>{props.currentPair}</td>
                    {props.order.status === 'pending'
                        ? <DefaultButton onClick={() => props.cancel(props.order)}>Cancel</DefaultButton>
                        : <h5></h5>
                    }
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderItem;

