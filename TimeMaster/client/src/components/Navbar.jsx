import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

// Brand columns matching the requested image reference
const brandColumns = [
    [
        "All brands", "LONGINES", "RADO", "TISSOT", "ROAMER", "CITIZEN",
        "Swiss Military by Chrono", "Swiss Military by Hanowa", "Continental", "AVIATOR"
    ],
    [
        "EverSwiss", "Cover", "Seiko", "Casio Enticer", "Casio Edifice", "Gshock",
        "U.S. Polo Assn.", "Beverly hills polo club", "Obaku", "Wimsons"
    ],
    [
        "Wimsons Smart", "Strand by Obaku", "Christian Bernard", "POLICE", "Timberland",
        "Hanowa", "Alba", "Slazenger", "Kimio", "Henry London"
    ],
    [
        "Timex", "Mondia", "ESPRIT", "Royal London", "Daniel Klein",
        "Mathey Tissot", "Fossil", "Fila", "Q&Q Superior", "Q&Q"
    ],
    [
        "Festina", "Eyki", "Welder", "MICHEL HERBELIN", "Festina Swiss",
        "Louis Cardin", "EMPORIA ARMANI"
    ]
];

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
        <nav className="fixed w-full z-50 transition-all duration-300 flex justify-between items-center text-black bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
            <div className="w-full relative flex justify-between items-center px-6 h-[80px] max-w-[1600px] mx-auto">

                {/* Left: Main Navigation */}
                <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 h-full w-1/3">
                    <Link to="/collection" className="hover:text-black transition-colors h-full flex items-center">Collection</Link>

                    {/* Mega Menu Container */}
                    <div className="group h-full flex items-center">
                        <span className="hover:text-black transition-colors cursor-pointer flex items-center gap-1">
                            Brands
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50 group-hover:rotate-180 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>

                        {/* Mega Menu Dropdown */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-[80px] w-[1200px] bg-white text-black shadow-lg border-t border-gray-100 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 cursor-default">
                            <div className="grid grid-cols-5 gap-8 p-12">
                                {brandColumns.map((col, idx) => (
                                    <div key={idx} className="flex flex-col space-y-4">
                                        {col.map((brand, bIdx) => {
                                            const isBold = brand === 'All brands' || brand === 'LONGINES';
                                            return (
                                                <Link
                                                    key={bIdx}
                                                    to={brand === 'All brands' ? '/collection' : `/collection?brand=${encodeURIComponent(brand)}`}
                                                    className={`hover:text-red-700 transition-colors tracking-wide normal-case ${isBold ? 'font-bold text-sm text-black' : 'font-normal text-[14px] text-gray-600'}`}
                                                    onClick={(e) => document.activeElement.blur()}
                                                >
                                                    {brand}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className="hover:text-black transition-colors h-full flex items-center">About</Link>
                    <Link to="/contact" className="hover:text-black transition-colors h-full flex items-center">Contact</Link>
                </div>

                {/* Center: Brand Logo */}
                <div className="flex justify-center items-center w-full lg:w-1/3 absolute left-1/2 -translate-x-1/2 h-full z-10 pointer-events-none">
                    <Link to="/" className="text-3xl font-serif font-bold tracking-[0.2em] text-black hover:opacity-70 transition-opacity pointer-events-auto">
                        GAMAGE
                    </Link>
                </div>

                {/* Right: Utilities */}
                <div className="flex space-x-6 items-center justify-end w-1/3 h-full z-10 text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
                    {userInfo ? (
                        <div className="relative h-full flex items-center">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="hover:text-black transition-colors flex items-center gap-1 h-full"
                            >
                                {userInfo.name.split(' ')[0]}
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-[70px] w-48 bg-white text-black shadow-lg border border-gray-100 py-2 origin-top-right z-50">
                                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">Profile & Orders</Link>
                                    {userInfo.role === 'admin' && (
                                        <Link to="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors border-t border-gray-100">Admin Dashboard</Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100">Sign Out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-black transition-colors">Sign In</Link>
                    )}

                    <button
                        onClick={toggleCart}
                        className="hover:text-black transition-colors flex items-center space-x-2"
                    >
                        <span>Cart</span>
                        <span className="bg-black text-white rounded-none px-2 py-0.5 text-[10px] font-bold">
                            {cartItemsCount}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
