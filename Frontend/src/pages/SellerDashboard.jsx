import React from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';

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
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="name" className="w-16 h-16 object-contain mr-4" />
                            <div>
                                <h2 className="text-lg font-semibold">Name is John Cena</h2>
                                <p className="text-gray-600">In stock: 5</p>
                                <p className="text-green-600">Selling price: $50</p>
                            </div>
                            <div className="flex justify-end">
                                <input
                                    type="number"
                                    // value={quantity} // You can bind this to your state
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-16 border rounded-md p-1 text-center"
                                />
                                <button
                                    // onClick={ASS} // Replace with your actual function
                                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    Add Stock
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-4 bg-white">
                    {/* Order-related content */}
                    {/* Example: Order list, order details, etc. */}
                    Orders
                </div>
            </div>

        </>
    )
}

export default SellerDashboard
