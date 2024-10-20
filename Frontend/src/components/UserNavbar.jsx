import React from 'react'
import Logout from './Logout'
import { Link } from 'react-router-dom'

const UserNavbar = ({ sellerName }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value);
            // Redirect to search page
            window.location.href = `/product/${event.target.value}`;
        }
    };

    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Scamazon Logo"
                        className="h-8 w-auto mr-2"
                    />
                    <h1 className="text-xl font-bold">Scamazon User Dashboard</h1>
                </div>
                <div>
                    {/* here will be the search bar */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 rounded-full border border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <div className="flex justify-center items-center gap-5">
                    <div>
                        Welcome, {sellerName || 'User'}
                    </div>
                    <Link to="/cart" className="text-white">Cart</Link>
                    <Link to="/myorders" className="text-white">My Orders</Link>
                    <Logout />
                </div>
            </div>
        </header>
    )
}

export default UserNavbar
