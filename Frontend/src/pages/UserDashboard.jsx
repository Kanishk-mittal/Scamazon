import React from 'react'
import { useParams } from 'react-router-dom'

const UserDashboard = () => {
    const UserId = useParams().id
    // save the userID in localStorage
    localStorage.setItem('userID', UserId);
    return (
        <div>
            This is user dashboard for user with id {UserId}
        </div>
    )
}

export default UserDashboard
