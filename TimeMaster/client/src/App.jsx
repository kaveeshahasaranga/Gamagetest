import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="font-sans text-gray-900">
        {/* Navbar Placeholder */}
        <nav className="fixed w-full z-50 transition-all duration-300 p-6 flex justify-between items-center text-white bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-2xl font-serif font-bold tracking-widest">TIMEMASTER</div>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-luxury-gold transition">COLLECTION</a>
            <a href="#" className="hover:text-luxury-gold transition">BRANDS</a>
            <a href="#" className="hover:text-luxury-gold transition">ABOUT</a>
            <a href="#" className="hover:text-luxury-gold transition">CONTACT</a>
          </div>
          <div className="flex space-x-4">
            <button className="hover:text-luxury-gold">Cart (0)</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
