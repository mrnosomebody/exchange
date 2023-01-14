import React from 'react';

const OrderItemShort = (props) => {
    const total = () => {
        return props.order.price * props.order.quantity
    }

    return (
        <div>
            <table className="table-small" cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                <tr>
                    <td>{props.order.order_type}</td>
                    <td>{props.order.price}</td>
                    <td>{total()}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderItemShort;