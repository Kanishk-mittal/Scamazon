import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import axios from 'axios';
import UserProductCard from '../components/UserProductCard';

const Products = () => {
    const { query } = useParams();
    const userId = localStorage.getItem('userID');
    const [sellerName, setSellerName] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (userId) {
            // fetch username using axios
            axios.post('http://localhost:5000/get_username', { user_id: userId })
                .then(response => setSellerName(response.data.name || ''))
                .catch(error => console.error('Error fetching user name:', error));
        }

        // fetch products using axios
        axios.post('http://localhost:5000/products/search', { query: query })
            .then(response => {
                const products = response.data.products || [];
                setProducts(products);
                console.log(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [query, userId]);

    return (
        <>
            <UserNavbar sellerName={sellerName} />
            <div className="p-4 bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <UserProductCard
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                userId={userId}
                                productId={product.p_id}
                                rating={product.rating}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;
