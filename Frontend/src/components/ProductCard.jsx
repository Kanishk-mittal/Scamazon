import React from 'react';

function ProductCard() {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="name" className="w-16 h-16 object-contain mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">Name is John Cena</h2>
                            <p className="text-gray-600">In stock: 5</p>
                            <p className="text-green-600">Selling price: $50</p>
                        </div>
                    </div>
                    <div className="flex items-center">
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
        </>
    );
}

export default ProductCard;
