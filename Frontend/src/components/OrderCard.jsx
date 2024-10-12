import React from 'react';

function OrderCard({ orderId, productName, productPrice, quantity, orderDate }) {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.png" alt={productName} className="w-16 h-16 object-contain mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Order ID: {orderId}</h2>
                            <p className="text-gray-600">Product Name: {productName}</p>
                            <p className="text-green-600">Product Price: ${productPrice}</p>
                            <p className="text-gray-600">Quantity: {quantity}</p>
                            <p className="text-gray-600">Order Date: {orderDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCard;
