// MyOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userID'); // Assuming userID is stored in localStorage

    useEffect(() => {
        axios.post('http://localhost:5000/user/orders', { user_id: userId })
            .then(response => {
                setOrders(response.data.orders || []);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, [userId]);

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-xl font-bold">My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                orders.map(order => (
                    <div key={order.order_id} className="my-2 p-2 border-b">
                        <h3 className="font-semibold">Order ID: {order.order_id}</h3>
                        <p>Product ID: {order.p_id}</p>
                        <p>Quantity: {order.qty}</p>
                        <p>Price: ${order.price}</p>
                        <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
                        <p>Status: {order.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;
