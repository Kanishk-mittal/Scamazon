import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProductCard from '../components/UserProductCard';

const UserDashboard = () => {
    const UserId = useParams().id;
    // Save the userID in localStorage
    localStorage.setItem('userID', UserId);

    // Example product data
    const products = [
        { name: "Headphone", description: "Top notch noise cancelling", price: 50 },
        { name: "Speaker", description: "High quality sound", price: 75 },
        { name: "Laptop", description: "Powerful performance", price: 999 },
        { name: "Smartphone", description: "Latest features", price: 799 },
        { name: "Tablet", description: "Portable and convenient", price: 499 },
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
                        <h1 className="text-xl font-bold">Scamazon User Dashboard</h1>
                    </div>
                    <div>
                        Welcome, User
                    </div>
                </div>
            </header>
            <div className="p-4 bg-gray-100">
                <h2>Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <UserProductCard
                            key={index}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
