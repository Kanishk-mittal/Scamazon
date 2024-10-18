import React from 'react';

function UserOrderCard({ orderId, productName, productPrice, quantity, orderDate, p_id, status }) {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={"/"+p_id+".png"} alt={productName} className="w-16 h-16 object-contain mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Order ID: {orderId}</h2>
                            <p className="text-gray-600">Product Name: {productName}</p>
                            <p className="text-green-600">Product Price: ${productPrice}</p>
                            <p className="text-gray-600">Quantity: {quantity}</p>
                            <p className="text-gray-600">Order Date: {orderDate}</p>
                            <p className="text-gray-600">Status: {status}</p>
                        </div>
                    </div>
                    {status == 'Processing'}
                </div>
            </div>
        </>
    );
}

export default UserOrderCard;
