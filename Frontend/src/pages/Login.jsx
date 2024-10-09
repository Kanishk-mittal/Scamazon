import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState(false); // false for buyer, true for seller
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const sellerID = localStorage.getItem('sellerID');
        const userID = localStorage.getItem('userID');

        // Check if sellerID or userID exists in localStorage and redirect accordingly
        if (sellerID) {
            navigate(`/seller/${sellerID}`);
        } else if (userID) {
            navigate(`/user/${userID}`);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username,
            password,
            role: role ? 'seller' : 'buyer'
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Handle successful login
                if (response.data.verified === true) {
                    if (role) {
                        localStorage.setItem('sellerID', response.data.id);
                        navigate(`/seller/${response.data.id}`);
                    } else {
                        localStorage.setItem('userID', response.data.id);
                        navigate(`/user/${response.data.id}`);
                    }
                }
                else {
                    alert("Account not verified");
                    setUsername('');
                    setPassword('');
                }
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-blue-300">
                <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffbe98] rounded-2xl shadow-5xl">
                    <div className="flex justify-center gap-3 pb-4">
                        <h1 className="text-3xl font-bold text-[#125b9a]">Welcome to Scamazon</h1>
                    </div>
                    <div className="flex mb-6 justify-center">
                        <label className="relative inline-flex items-center cursor-pointer w-full">
                            <input type="checkbox" className="sr-only peer" onChange={() => setRole(!role)} />
                            <div className=" bg-[#f69760] peer rounded-lg outline-none duration-100 after:duration-500 w-full h-12 peer-focus:outline-none  after:content-['Buyer'] after:absolute after:outline-none after:rounded-lg after:h-10 after:w-[49%] after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center after:text-sky-800 after:font-bold peer-checked:after:translate-x-[100%] peer-checked:after:content-['Seller'] peer-checked:after:border-white"></div>
                        </label>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="pb-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#000000]">Username</label>
                            <div className="relative text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <input type="text" name="username" id="username" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="pb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#000000]">Password</label>
                            <div className="relative text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk">
                                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                        <path d="M12 8v8"></path>
                                        <path d="m8.5 14 7-4"></path>
                                        <path d="m8.5 10 7 4"></path>
                                    </svg>
                                </span>
                                <input type="password" name="password" id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                
                            </div>
                        </div>
                        <button type="submit" className="w-full text-[#FFFFFF] bg-[#f05a7e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Login</button>
                        <div className="text-sm  text-[#0b8494] text-center">Don't have an account yet? <a href="#" className="font-medium text-[#f05a7e] hover:underline">Sign Up</a></div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
