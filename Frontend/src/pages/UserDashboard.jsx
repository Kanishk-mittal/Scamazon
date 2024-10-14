import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const userId = useParams().id;

    useEffect(() => {
        localStorage.setItem('userID', userId);

        // Fetch products from the backend
        fetch('http://localhost:5000/user/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data.products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }, [userId]);

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
