import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
        {/* Navbar */}
        <nav className="fixed w-full z-50 transition-all duration-300 p-6 flex justify-between items-center text-white bg-luxury-black/90 shadow-lg">
          <Link to="/" className="text-2xl font-serif font-bold tracking-widest hover:text-luxury-gold transition-colors">TIMEMASTER</Link>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <Link to="/collection" className="hover:text-luxury-gold transition-colors">COLLECTION</Link>
            <a href="#" className="hover:text-luxury-gold transition-colors">BRANDS</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">ABOUT</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">CONTACT</a>
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-luxury-gold transition-colors">Cart (0)</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
