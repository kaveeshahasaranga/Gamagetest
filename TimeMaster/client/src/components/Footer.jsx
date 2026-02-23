import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 text-black pt-16 pb-8">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
                    {/* Column 1: The Collection */}
                    <div>
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-black">The Collection</h4>
                        <ul className="space-y-4 text-xs tracking-widest text-gray-600">
                            <li><Link to="/collection" className="hover:text-black transition-colors">All Watches</Link></li>
                            <li><Link to="/collection?category=Men" className="hover:text-black transition-colors">Men's Watches</Link></li>
                            <li><Link to="/collection?category=Women" className="hover:text-black transition-colors">Women's Watches</Link></li>
                            <li><Link to="/collection" className="hover:text-black transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Find a Boutique */}
                    <div>
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-black">Find a Boutique</h4>
                        <ul className="space-y-4 text-xs tracking-widest text-gray-600">
                            <li><a href="#" className="hover:text-black transition-colors">Store Locator</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Book an Appointment</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Authorized Retailers</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div>
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-black">Customer Service</h4>
                        <ul className="space-y-4 text-xs tracking-widest text-gray-600">
                            <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Order Status</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Warranty Information</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-black">Newsletter</h4>
                        <p className="text-xs text-gray-500 mb-6 tracking-wide leading-relaxed">
                            Subscribe to receive news about new arrivals, exclusive releases, and high-end watchmaking.
                        </p>
                        <form className="flex border-b border-gray-300 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-400 text-black px-2"
                            />
                            <button type="button" className="text-xs font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-400 uppercase">
                    <p>&copy; {new Date().getFullYear()} GAMAGE WATCHES. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-black transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
