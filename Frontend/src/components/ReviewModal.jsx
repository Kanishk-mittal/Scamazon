import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, review });
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-8 w-11/12 max-w-lg"> {/* Adjusted padding and width */}
                <h2 className="text-lg font-semibold mb-4">Submit Your Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Rating:</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded px-3 py-2 w-full"> {/* Increased padding */}
                            <option value="0">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="border rounded w-full px-3 py-2 h-32" // Increased height
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
