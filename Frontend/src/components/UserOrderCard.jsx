import React, { useState } from 'react';
import ReviewModal from './ReviewModal'; // Import the ReviewModal component
import axios from 'axios';

function UserOrderCard({ orderId, productName, productPrice, quantity, orderDate, p_id, status }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReviewSubmit = (reviewData) => {
        console.log("Submitted Review Data:", reviewData);
        // Here you can send the review data to your API
        const userId = localStorage.getItem('userID');
        const product_id = p_id;
        const order_id = orderId;
        const product_rating = reviewData.productrating;
        const product_review = reviewData.productreview;
        const seller_rating = reviewData.sellerrating;
        const seller_review = reviewData.sellerreview;
        axios.post('http://localhost:5000/review', {
            "user_id": userId,
            "product_id": product_id,
            "order_id": order_id,
            "product_rating": product_rating,
            "product_review": product_review,
            "seller_rating": seller_rating,
            "seller_review": seller_review
        })
            .then(() => {
                // reload the page
                window.location.reload();
                alert('Review submitted successfully');
            })
            .catch(error => {
                console.error('Error submitting review:', error);
            });
    }
    const receive = () => {
        // Logic to update the order status to 'Delivered'
        console.log("Order Received with ID:", orderId);
        axios.post('http://localhost:5000/receive', {
            "order_id": orderId
        })
            .then(() => {
                // reload the page
                window.location.reload();
                alert('Order received successfully');
            })
            .catch(error => {
                console.error('Error receiving order:', error);
            });
    }

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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Review
                    </button>
                )}
                {status === 'Shipped' && (
                    <button
                        onClick={receive}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Received
                    </button>
                )}
            </div>
            <ReviewModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleReviewSubmit} 
            />
        </div>
    );
}

export default UserOrderCard;
