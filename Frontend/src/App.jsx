import React from 'react'
import './App.css'
import Login from './pages/Login'
import SellerDashboard from './pages/SellerDashboard'
import UserDashboard from './pages/UserDashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/seller/:id',
      element: <SellerDashboard />
    },
    {
      path: '/user/:id',
      element: <UserDashboard />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
