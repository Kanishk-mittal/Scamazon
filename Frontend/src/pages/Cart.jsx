// Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from backend
        axios.get('http://localhost:5000/cart')
            .then(response => {
                setCartItems(response.data.items || []);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    const handleRemoveFromCart = (itemId) => {
        // Logic to remove item from cart
        axios.post('http://localhost:5000/cart/remove', { itemId })
            .then(() => {
                setCartItems(cartItems.filter(item => item.id !== itemId));
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
            });
    };

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-xl font-bold">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center my-2 p-2 border-b">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p>Price: ${item.price}</p>
                        </div>
                        <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
