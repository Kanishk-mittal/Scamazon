import React from 'react';
import { Link } from 'react-router-dom';

function UserOrderCard({ orderId, productName, productPrice, quantity, orderDate, p_id, status }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={`/${p_id}.png`} alt={productName} className="w-16 h-16 object-contain mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold">Order ID: {orderId}</h2>
                        <p className="text-gray-600">Product Name: {productName}</p>
                        <p className="text-green-600">Product Price: ${productPrice}</p>
                        <p className="text-gray-600">Quantity: {quantity}</p>
                        <p className="text-gray-600">Order Date: {orderDate}</p>
                        <p className="text-gray-600">Status: {status}</p>
                    </div>
                </div>
                {status === 'Delivered' && (
                    <Link to={`/review/${orderId}`} className="ml-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Review
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default UserOrderCard;
