import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ toggleCart }) => {
    const { items } = useSelector((state) => state.cart);
    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 p-6 flex justify-between items-center text-white bg-luxury-black/90 shadow-lg">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest hover:text-luxury-gold transition-colors">GAMAGE</Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
                <Link to="/collection" className="hover:text-luxury-gold transition-colors">COLLECTION</Link>
                <a href="#" className="hover:text-luxury-gold transition-colors">BRANDS</a>
                <a href="#" className="hover:text-luxury-gold transition-colors">ABOUT</a>
                <a href="#" className="hover:text-luxury-gold transition-colors">CONTACT</a>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={toggleCart}
                    className="hover:text-luxury-gold transition-colors font-medium flex items-center space-x-2"
                >
                    <span>Cart</span>
                    <span className="bg-luxury-gold text-luxury-black rounded-full px-2 py-0.5 text-xs">
                        {cartItemsCount}
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
