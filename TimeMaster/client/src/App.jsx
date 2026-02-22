import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManager from './pages/admin/ProductManager';
import ProductEdit from './pages/admin/ProductEdit';
import OrderManager from './pages/admin/OrderManager';
import UserManager from './pages/admin/UserManager';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router>
      <div className="font-sans text-gray-300 bg-[#0f0f0f] min-h-screen">
        <Navbar toggleCart={toggleCart} />
        <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<ProductList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="product/:id/edit" element={<ProductEdit />} />

            {/* To be implemented in next step */}
            <Route path="orders" element={<OrderManager />} />
            <Route path="users" element={<UserManager />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
