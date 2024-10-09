import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [role, setRole] = useState(false); // false for buyer, true for seller
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [p_name, setP_name] = useState('');
    const [s_name, setS_name] = useState('');
    const [gstin, setGstin] = useState('');
    const handelSubmit = async (e) => {
        e.preventDefault();
        const data = [
            username,
            password,
            email,
            contact,
            address,
            p_name,
            s_name,
            gstin
        ]
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', data, {
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
                    alert(response.data.message);
                }
            } else {
                alert("Some error happened");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-blue-300 py-14">
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
                    <form className="flex flex-col" onSubmit={handelSubmit} >
                        <div className="pb-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#000000]">Username</label>
                            <div className="relative text-gray-400">
                                <input type="text" name="username" id="username" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="pb-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#000000]">Email</label>
                            <div className="relative text-gray-400">
                                <input type="email" name="username" id="username" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="abcd@xyz.com" autoComplete="off" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            </div>
                        </div>
                        <div className="pb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#000000]">Password</label>
                            <div className="relative text-gray-400">
                                <input type="password" name="password" id="password" placeholder="••••••••••" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            </div>
                        </div>
                        <div className="pb-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#000000]">Contact</label>
                            <div className="relative text-gray-400">
                                <input type="text" name="username" id="username" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="1234567890" autoComplete="off" value={contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                        </div>
                        <div className="pb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#000000]">Address</label>
                            <div className="relative text-gray-400">
                                <input type="text" name="password" id="password" placeholder="Address" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                        {role && (
                            <>
                                <div className="pb-2">
                                    <label htmlFor="p_name" className="block mb-2 text-sm font-medium text-[#000000]">Product Name</label>
                                    <div className="relative text-gray-400">
                                        <input type="text" name="p_name" id="p_name" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Product Name" autoComplete="off" value={p_name} onChange={(e) => setP_name(e.target.value)} />
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <label htmlFor="s_name" className="block mb-2 text-sm font-medium text-[#000000]">Shop Name</label>
                                    <div className="relative text-gray-400">
                                        <input type="text" name="s_name" id="s_name" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="Shop Name" autoComplete="off" value={s_name} onChange={(e) => setS_name(e.target.value)} />
                                    </div>
                                </div>
                                <div className="pb-6">
                                    <label htmlFor="gstin" className="block mb-2 text-sm font-medium text-[#000000]">GSTIN</label>
                                    <div className="relative text-gray-400">
                                        <input type="text" name="gstin" id="gstin" className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" placeholder="GSTIN" autoComplete="off" value={gstin} onChange={(e) => setGstin(e.target.value)} />
                                    </div>
                                </div>
                            </>
                        )}
                        <button type="submit" className="w-full text-[#FFFFFF] bg-[#f05a7e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
