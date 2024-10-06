import React from 'react'
import { useParams } from 'react-router-dom'

const SellerDashboard = () => {
    const SellerId = useParams().id
    // save the sellerID in localStorage
    localStorage.setItem('sellerID', SellerId);
    return (
        <div>
            This is seller dashboard for seller with id {SellerId}
        </div>
    )
}

export default SellerDashboard
