import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

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

    return (
        <div>
            {/* Your login form */}
            <h1>Login Page</h1>
        </div>
    );
}

export default Login;
