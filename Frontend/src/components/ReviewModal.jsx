import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [sellerrating, setSellerRating] = useState(0);
    const [sellerreview, setSellerReview] = useState('');
    const [productrating, setProductRating] = useState(0);
    const [productreview, setProductReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ sellerrating, sellerreview, productrating, productreview });
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-full">
            <div className="bg-white rounded-lg shadow-md p-8 w-11/12 max-w-lg overflow-auto" style={{ maxHeight: '90%' }}> {/* Adjusted padding and width */}
                <h2 className="text-lg font-semibold mb-4">Submit Your Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Seller Rating:</label>
                        <select value={sellerrating} onChange={(e) => setSellerRating(e.target.value)} className="border rounded px-3 py-2 w-full">
                            <option value="0">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Seller Review:</label>
                        <textarea
                            value={sellerreview}
                            onChange={(e) => setSellerReview(e.target.value)}
                            className="border rounded w-full px-3 py-2 h-32"
                            rows="4"
                        />
                    </div>
                    {/* Same for product */}
                    <div className="mb-4">
                        <label className="block mb-2">Product Rating:</label>
                        <select value={productrating} onChange={(e) => setProductRating(e.target.value)} className="border rounded px-3 py-2 w-full">
                            <option value="0">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Product Review:</label>
                        <textarea
                            value={productreview}
                            onChange={(e) => setProductReview(e.target.value)}
                            className=" rounded w-full px-3 py-2 h-32"
                            rows="4"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-black px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
