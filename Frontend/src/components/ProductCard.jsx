import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function ProductCard({ name, quantity, price, p_id }) {
    const [stockUp, setstockUp] = useState(0)
    const updateStock = ({}) => {
        console.log(`Updating stock for product ${p_id} by ${stockUp}`);
        const response = axios.post('http://localhost:5000/updateStock', { "p_id": p_id, "quantity": stockUp })
        response.then((res) => {
            alert(res.data.message)
            setstockUp(0)
            //refresh the page
            window.location.reload()
        })
    }
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={"/" + p_id + ".png"} alt={name} className="w-16 h-16 object-contain mr-4" />
                        <div>
                            <h2 className="text-lg font-semibold">{name}</h2>
                            <p className="text-gray-600">In stock: {quantity}</p>
                            <p className="text-green-600">Selling price: ${price}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={stockUp} // You can bind this to your state
                            onChange={(e) => setstockUp(parseInt(e.target.value))}
                            className="w-16 border rounded-md p-1 text-center"
                        />
                        <button
                            onClick={updateStock} // Replace with your actual function
                            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                            Update Stock
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;