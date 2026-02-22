import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const Checkout = () => {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            dispatch(clearCart());
            alert('Order Placed Successfully! Thank you for shopping with GAMAGE.');
            navigate('/');
        }, 2000);
    };

    if (items.length === 0 && !isProcessing) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-serif text-luxury-black mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Add some luxury timepieces to your collection before checking out.</p>
                <button
                    onClick={() => navigate('/collection')}
                    className="px-8 py-3 bg-luxury-black text-white hover:bg-black transition-colors uppercase tracking-widest text-sm font-semibold"
                >
                    Return to Collection
                </button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-luxury-black font-bold tracking-wider mb-4">SECURE CHECKOUT</h1>
                    <div className="h-1 w-24 bg-luxury-gold mx-auto"></div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-7 mb-10 lg:mb-0">
                        <form onSubmit={handlePlaceOrder} className="bg-white p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-serif text-luxury-black mb-6 border-b border-gray-100 pb-4">Shipping Information</h2>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input required type="text" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input required type="text" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input required type="email" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                    <input required type="text" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                </div>
                            </div>

                            <h2 className="text-xl font-serif text-luxury-black mb-6 border-b border-gray-100 pb-4">Payment Details</h2>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                        <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                                        <input required type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-5 bg-luxury-black text-white hover:bg-black transition-colors uppercase tracking-widest font-bold text-sm flex justify-center items-center ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing Secure Payment...</span>
                                    </span>
                                ) : (
                                    `Place Order • $${totalAmount.toLocaleString()}`
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 shadow-sm border border-gray-100 sticky top-32">
                            <h2 className="text-xl font-serif text-luxury-black mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                            <div className="space-y-6 mb-6 max-h-96 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-gray-50" />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-luxury-black">{item.name}</h3>
                                            <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                                <span className="font-medium text-luxury-gold">${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span>Complimentary</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Estimated Tax</span>
                                    <span>Calculated locally</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-luxury-black pt-4 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>${totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
