import React, { useState, useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import OrderCard from '../components/OrderCard';

const SellerDashboard = () => {
    const { id: sellerId } = useParams();
    const [sellerName, setSellerName] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    // Save the sellerID in localStorage
    useEffect(() => {
        localStorage.setItem('sellerID', sellerId);
    }, [sellerId]);

    // Fetch seller name
    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_sellername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seller_id: sellerId }),
        })
            .then(response => response.json())
            .then(data => setSellerName(data.name || ''))
            .catch(error => console.error('Error fetching seller name:', error));
    }, [sellerId]);

    // Fetch product details from the Flask backend
    useEffect(() => {
        fetch('http://127.0.0.1:5000/seller/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seller_id: sellerId }),
        })
            .then(response => response.json())
            .then(data => setProducts(data.products || []))
            .catch(error => console.error('Error fetching product data:', error));
    }, [sellerId]);

    // Fetch order details from the Flask backend
    useEffect(() => {
        fetch('http://127.0.0.1:5000/seller/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seller_id: sellerId }),
        })
            .then(response => response.json())
            .then(data => setOrders(data.orders || []))
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
                    <div>
                        Welcome, {sellerName || 'Seller'}
                    </div>
                </div>
            </header>
            <div className="flex">
                <div className="w-1/2 p-4 bg-gray-100">
                    <h2>Products</h2>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <ProductCard
                                key={index}
                                name={product.p_name}
                                quantity={product.qty}
                                price={product.price}
                            />
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
                <div className="w-1/2 p-4 bg-white">
                    <h2>Orders</h2>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <OrderCard
                                key={index}
                                orderId={order.order_id}
                                productName={order.p_name}
                                productPrice={order.p_price}
                                quantity={order.qty}
                                orderDate={order.order_date}
                            />
                        ))
                    ) : (
                        <p>No orders available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
