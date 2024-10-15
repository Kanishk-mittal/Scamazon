import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCarousel from '../components/ProductCarousel';
import Logout from '../components/Logout';

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [sellerName, setSellerName] = useState('');
    const userId = useParams().id;

    useEffect(() => {
        localStorage.setItem('userID', userId);

        // Fetch user name using axios
        axios.post('http://localhost:5000/get_username', { user_id: userId })
            .then(response => {
                setSellerName(response.data.name || '');
            })
            .catch(error => {
                console.error('Error fetching user name:', error);
            });

        // Fetch products from the backend using axios
        axios.post('http://localhost:5000/user/products', { user_id: userId })
            .then(response => {
                const products = response.data.products || [];
                // Classifying the products into categories
                const categories = {};
                products.forEach(product => {
                    if (!categories[product.category]) {
                        categories[product.category] = [];
                    }
                    categories[product.category].push(product);
                });
                setProducts(categories);
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
                    <div className='flex justify-center items-center gap-5'>
                        <div>
                            Welcome, {sellerName || 'Seller'}
                        </div>
                        <Logout />
                    </div>
                </div>
            </header>
            <div className="p-4 bg-gray-100">
                <h2>Products</h2>
                {/* For each category, display a separate carousel */}
                {Object.keys(products).map((category, index) => (
                    <div key={index} className="my-4">
                        <h3 className="text-xl font-bold">{category}</h3>
                        <ProductCarousel products={products[category]} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserDashboard;
