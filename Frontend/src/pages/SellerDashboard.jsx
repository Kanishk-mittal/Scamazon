import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import OrderCard from '../components/OrderCard';
import Logout from '../components/Logout';

const SellerDashboard = () => {
    const { id: sellerId } = useParams();
    const [sellerName, setSellerName] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    // Save the sellerID in localStorage
    useEffect(() => {
        localStorage.setItem('sellerID', sellerId);
    }, [sellerId]);

    // Fetch seller name using axios
    useEffect(() => {
        axios.post('http://127.0.0.1:5000/get_sellername', { seller_id: sellerId })
            .then(response => setSellerName(response.data.name || ''))
            .catch(error => console.error('Error fetching seller name:', error));
    }, [sellerId]);

    // Fetch product details using axios
    useEffect(() => {
        axios.post('http://127.0.0.1:5000/seller/product', { seller_id: sellerId })
            .then(response => setProducts(response.data.products || []))
            .catch(error => console.error('Error fetching product data:', error));
    }, [sellerId]);

    // Fetch order details using axios
    useEffect(() => {
        axios.post('http://127.0.0.1:5000/seller/order', { seller_id: sellerId })
            .then(response => setOrders(response.data.orders || []))
            .catch(error => console.error('Error fetching order data:', error));
    }, [sellerId]);

    return (
        <>
            <header className="bg-blue-500 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="/logo.png"
                            alt="Scamazon Logo"
                            className="h-8 w-auto mr-2"
                        />
                        <h1 className="text-xl font-bold">Scamazon Seller Dashboard</h1>
                    </div>
                    <div className='flex justify-center items-center gap-5'>
                        <div>
                            Welcome, {sellerName || 'Seller'}
                        </div>
                        <Logout />
                    </div>
                </div>
            </header>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4 bg-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Products</h2>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <ProductCard
                                key={index}
                                name={product.p_name}
                                quantity={product.qty}
                                price={product.price}
                                p_id={product.p_id}
                            />
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                    <div className="mt-9 w-full flex justify-center items-center">
                        <button onClick={() => window.location.href = '/addProduct'} className="bg-blue-500 text-white px-4 py-2 rounded">Add product + </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-4">Orders</h2>
                    {orders.length > 0 ? (
                        <>
                            <h3 className="text-md font-medium mb-2">Processing</h3>
                            <hr />
                            {orders.filter(order => order.status === 'Processing').length > 0 ? (
                                orders.filter(order => order.status === 'Processing').map((order, index) => (
                                    <OrderCard
                                        key={index}
                                        orderId={order.order_id}
                                        productName={order.p_name}
                                        productPrice={order.p_price}
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
                                    <OrderCard
                                        key={index}
                                        orderId={order.order_id}
                                        productName={order.p_name}
                                        productPrice={order.p_price}
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
                                    <OrderCard
                                        key={index}
                                        orderId={order.order_id}
                                        productName={order.p_name}
                                        productPrice={order.p_price}
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
                        <p>No orders available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
