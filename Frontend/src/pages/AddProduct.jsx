import React from 'react';
import { useState, useEffect } from 'react';
import Logout from '../components/Logout';
import axios from 'axios';

const AddProduct = () => {
    const [sellerId, setSellerId] = useState(null);
    const [sellerName, setSellerName] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('sellerID');
        if (id) {
            setSellerId(id);
        }
    }, []);

    useEffect(() => {
        if (sellerId) {
            axios.post('http://127.0.0.1:5000/get_sellername', { seller_id: sellerId })
                .then(response => setSellerName(response.data.name || ''))
                .catch(error => console.error('Error fetching seller name:', error));
        }
    }, [sellerId]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (e) => {
        console.log('Form submitted');
        e.preventDefault();
        const name = e.target.name.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const stock = e.target.stock.value;
        const warranty = e.target.warranty.value;

        const formData = new FormData();
        formData.append('seller_id', sellerId);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('warranty', warranty);
        formData.append('file', file);

        axios.post('http://localhost:5000/add_product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
                alert('Product added successfully');
                e.target.reset();
                window.location.href = `/seller/${sellerId}`;
            })
            .catch(error => {
                console.error('Error adding product:', error);
                alert('Error adding product');
            });
    };

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
            <form className="max-w-lg mx-auto p-8 bg-white shadow-md rounded" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Product Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Product Name" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" placeholder="Category" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" required></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="Price" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                        Stock
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="number" placeholder="Stock" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="warranty">
                        Warranty
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="warranty" type="text" placeholder="Warranty" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upload">
                        Upload Image
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="upload" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Product
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddProduct;
