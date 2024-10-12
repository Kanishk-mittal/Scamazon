import React from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import OrderCard from '../components/OrderCard';

const SellerDashboard = () => {
    const SellerId = useParams().id;
    // save the sellerID in localStorage
    localStorage.setItem('sellerID', SellerId);

    // Example product data
    const products = [
        { name: "Speaker", quantity: 5, price: 50 },
        { name: "Product 2", quantity: 3, price: 20 },
        { name: "Prod", quantity: 3, price: 20 },
        { name: "Prod", quantity: 3, price: 20 },
        // Add more products as needed
    ];

    // Example order data
    const orders = [
        { orderId: "12345", productName: "Example Product", productPrice: 50, quantity: 2, orderDate: "2024-10-10" },
        { orderId: "12346", productName: "Another Product", productPrice: 30, quantity: 1, orderDate: "2024-10-11" },
        // Add more orders as needed
    ];

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
                        Welcome, Username {/* Display the signed-in username */}
                    </div>
                </div>
            </header>
            <div className="flex">
                <div className="w-1/2 p-4 bg-gray-100">
                    {/* Product-related content */}
                    Products
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.name}
                            quantity={product.quantity}
                            price={product.price}
                        />
                    ))}
                </div>
                <div className="w-1/2 p-4 bg-white">
                    {/* Order-related content */}
                    Orders
                    {orders.map((order, index) => (
                        <OrderCard
                            key={index}
                            orderId={order.orderId}
                            productName={order.productName}
                            productPrice={order.productPrice}
                            quantity={order.quantity}
                            orderDate={order.orderDate}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
