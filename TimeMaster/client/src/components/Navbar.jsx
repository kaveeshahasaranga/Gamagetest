import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

const Navbar = ({ toggleCart }) => {
    const { items } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        setDropdownOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 p-6 flex justify-between items-center text-white bg-luxury-black/95 shadow-lg border-b border-luxury-gray">
            <Link to="/" className="text-2xl font-serif font-bold tracking-widest hover:text-luxury-gold transition-colors">GAMAGE</Link>

            <div className="hidden md:flex space-x-8 text-sm font-medium tracking-[0.15em] uppercase text-luxury-text-gray">
                <Link to="/collection" className="hover:text-white transition-colors">Collection</Link>
                <a href="#" className="hover:text-white transition-colors">Brands</a>
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex space-x-6 items-center">
                {userInfo ? (
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="hover:text-luxury-gold text-sm tracking-widest uppercase transition-colors flex items-center gap-1 text-luxury-text-gray"
                        >
                            {userInfo.name.split(' ')[0]}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-4 w-48 bg-luxury-black text-luxury-text-gray shadow-xl border border-luxury-gray py-2 origin-top-right z-50">
                                <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-luxury-gray hover:text-white transition-colors">Profile & Orders</Link>
                                {userInfo.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-luxury-gray hover:text-white transition-colors">Admin Dashboard</Link>
                                )}
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-luxury-gray hover:text-red-300 transition-colors">Sign Out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="hover:text-white text-luxury-text-gray text-sm tracking-widest uppercase transition-colors">Sign In</Link>
                )}

                <button
                    onClick={toggleCart}
                    className="text-luxury-text-gray hover:text-white transition-colors font-medium flex items-center space-x-2 text-sm tracking-widest uppercase"
                >
                    <span>Cart</span>
                    <span className="bg-luxury-gold text-white rounded-none px-2 py-0.5 text-xs">
                        {cartItemsCount}
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
