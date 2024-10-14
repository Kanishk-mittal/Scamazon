import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';

const UserDashboard = () => {
    const UserId = useParams().id;

    // Save the userID in localStorage
    localStorage.setItem('userID', UserId);

    // Example product data
    const products = [
        { name: "Headphone", description: "Top notch noise cancelling", price: 50, image: "/logo.png" },
        { name: "Speaker", description: "High quality sound", price: 75, image: "/logo.png" },
        { name: "Laptop", description: "Powerful performance", price: 999, image: "/logo.png" },
        { name: "Smartphone", description: "Latest features", price: 799, image: "/logo.png" },
        { name: "Tablet", description: "Portable and convenient", price: 499, image: "/logo.png" },
        // Add more products as needed
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
                <ProductCarousel products={products} />
            </div>
        </>
    );
};

export default UserDashboard;
