import React from 'react';

function UserProductCard({ image, name, description, price }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <img src={image || "/logo.png"} alt={name} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg font-semibold mb-2">{name}</h2>
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-green-600 mb-4">Price: ${price}</p>
            <button className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded border-black border">
                Add to Cart
            </button>
        </div>
    );
}

export default UserProductCard;
