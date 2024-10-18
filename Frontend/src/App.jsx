import React from 'react';
import './App.css';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart'; // Import Cart component
import MyOrders from './pages/MyOrders'; // Import MyOrders component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    },
    {
      path: '/cart', // Add Cart route
      element: <Cart />
    },
    {
      path: '/myorders', // Add MyOrders route
      element: <MyOrders />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
