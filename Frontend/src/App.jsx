import React from 'react'
import './App.css'
import Login from './pages/Login'
import SellerDashboard from './pages/SellerDashboard'
import UserDashboard from './pages/UserDashboard'
import Register from './pages/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddProduct from './pages/AddProduct'

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
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/addProduct',
      element: <AddProduct />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
