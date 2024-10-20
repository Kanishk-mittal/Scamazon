import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserOrderCard from '../components/UserOrderCard'; 
import UserNavbar from '../components/UserNavbar'; 

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [sellerName, setSellerName] = useState('');
    const userId = localStorage.getItem('userID');

    useEffect(() => {
        // Fetch user name using axios
        axios.post('http://localhost:5000/get_username', { user_id: userId })
            .then(response => setSellerName(response.data.name || ''))
            .catch(error => console.error('Error fetching user name:', error));

        // Fetch orders from the backend using axios
        axios.post('http://localhost:5000/user/orders', { user_id: userId })
            .then(response => {
                setOrders(response.data.orders || []);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, [userId]);

    return (
        <>
            <UserNavbar sellerName={sellerName} />

            <div className="p-4 bg-gray-100">
                <h2 className="text-xl font-bold">My Orders</h2>
                {orders.length > 0 ? (
                    <>
                        <h3 className="text-md font-medium mb-2">Processing</h3>
                        <hr />
                        {orders.filter(order => order.status === 'Processing').length > 0 ? (
                            orders.filter(order => order.status === 'Processing').map((order, index) => (
                                <UserOrderCard
                                    key={index}
                                    orderId={order.order_id}
                                    productName={order.p_name} // Ensure p_name is fetched from the API
                                    productPrice={order.price}
                                    quantity={order.qty}
                                    orderDate={order.order_date}
                                    p_id={order.p_id}
                                    status={order.status}
                                />
                            ))
                        ) : (
                            <p className='py-5'>Nothing to display here.</p>
                        )}

                        <h3 className="text-md font-medium mb-2">Shipped</h3>
                        <hr />
                        {orders.filter(order => order.status === 'Shipped').length > 0 ? (
                            orders.filter(order => order.status === 'Shipped').map((order, index) => (
                                <UserOrderCard
                                    key={index}
                                    orderId={order.order_id}
                                    productName={order.p_name}
                                    productPrice={order.price}
                                    quantity={order.qty}
                                    orderDate={order.order_date}
                                    p_id={order.p_id}
                                    status={order.status}
                                />
                            ))
                        ) : (
                            <p className='py-5'>Nothing to display here.</p>
                        )}

                        <h3 className="text-md font-medium mb-2">Delivered</h3>
                        <hr />
                        {orders.filter(order => order.status === 'Delivered').length > 0 ? (
                            orders.filter(order => order.status === 'Delivered').map((order, index) => (
                                <UserOrderCard
                                    key={index}
                                    orderId={order.order_id}
                                    productName={order.p_name}
                                    productPrice={order.price}
                                    quantity={order.qty}
                                    orderDate={order.order_date}
                                    p_id={order.p_id}
                                    status={order.status}
                                />
                            ))
                        ) : (
                            <p className='py-5'>Nothing to display here.</p>
                        )}
                    </>
                ) : (
                    <p>You have no orders yet.</p>
                )}
            </div>
        </>
    );
};

export default MyOrders;
