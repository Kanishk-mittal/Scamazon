import React from 'react';

function OrderCard() {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Product" className="w-16 h-16 object-contain mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Order ID: 12345</h2>
                            <p className="text-gray-600">Product Name: Example Product</p>
                            <p className="text-green-600">Product Price: $50</p>
                            <p className="text-gray-600">Quantity: 2</p>
                            <p className="text-gray-600">Order Date: 2024-10-10</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCard;
