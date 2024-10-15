import React from 'react'

const Logout = () => {
return (
        <button 
            onClick={() => {
                localStorage.removeItem('userID');
                localStorage.removeItem('sellerID');
                window.location.href = '/';
            }} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>
)
}

export default Logout
