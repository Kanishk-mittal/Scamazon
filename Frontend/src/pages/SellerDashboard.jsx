import React from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import ProductCard from '../components/productCard';
import OrderCard from '../components/OrderCard';

const SellerDashboard = () => {
    const SellerId = useParams().id
    // save the sellerID in localStorage
    localStorage.setItem('sellerID', SellerId);
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
                    {/* Example: Product list, add/edit product forms, etc. */}
                    Products
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <div className="w-1/2 p-4 bg-white">
                    {/* Order-related content */}
                    {/* Example: Order list, order details, etc. */}
                    Orders
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>
            </div>

        </>
    )
}

export default SellerDashboard
