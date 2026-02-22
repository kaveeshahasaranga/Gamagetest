import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../redux/slices/cartSlice';

const Checkout = () => {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!userInfo) {
            alert('Please sign in to place an order.');
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const orderData = {
                products: items.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
                totalAmount,
                paymentMethod: 'PayHere' // Hardcoded for this simulated flow
            };

            await axios.post('/api/orders', orderData, config);

            setIsProcessing(false);
            dispatch(clearCart());
            alert('Order Placed Successfully! Thank you for shopping with GAMAGE.');
            navigate('/profile');
        } catch (error) {
            setIsProcessing(false);
            alert(error.response?.data?.message || 'Error placing order');
        }
    };

    if (items.length === 0 && !isProcessing) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center bg-luxury-dark text-white px-4">
                <h2 className="text-3xl font-serif tracking-widest uppercase mb-4 text-center">Your Cart is Empty</h2>
                <p className="text-luxury-text-gray mb-10 text-center tracking-wide">Add some luxury timepieces to your collection before checking out.</p>
                <button
                    onClick={() => navigate('/collection')}
                    className="px-8 py-4 border border-luxury-gray text-luxury-text-gray hover:bg-white hover:text-luxury-black hover:border-white transition-colors uppercase tracking-widest text-sm font-semibold"
                >
                    Return to Collection
                </button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-luxury-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-serif text-white font-bold tracking-widest uppercase mb-6">SECURE CHECKOUT</h1>
                    <div className="h-px w-24 bg-luxury-gold mx-auto"></div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-7 mb-10 lg:mb-0">
                        <form onSubmit={handlePlaceOrder} className="bg-luxury-black p-8 shadow-sm border border-luxury-gray">
                            <h2 className="text-xl font-serif text-white uppercase tracking-widest mb-6 border-b border-luxury-gray pb-4">Shipping Information</h2>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div>
                                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">First Name</label>
                                    <input required type="text" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Last Name</label>
                                    <input required type="text" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Email Address</label>
                                    <input required type="email" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Street Address</label>
                                    <input required type="text" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors" />
                                </div>
                            </div>

                            <h2 className="text-xl font-serif text-white uppercase tracking-widest mb-6 border-b border-luxury-gray pb-4">Payment Details</h2>
                            <div className="space-y-6 mb-10">
                                <div>
                                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Card Number</label>
                                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray placeholder-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors tracking-widest placeholder:tracking-widest" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Expiry Date</label>
                                        <input required type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray placeholder-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors uppercase tracking-widest placeholder:tracking-widest" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">CVC</label>
                                        <input required type="text" placeholder="123" className="w-full px-4 py-3 bg-luxury-dark text-white border border-luxury-gray placeholder-luxury-gray focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:border-luxury-gold transition-colors tracking-widest placeholder:tracking-widest" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-5 bg-luxury-gold text-white hover:bg-white hover:text-luxury-black transition-colors uppercase tracking-widest font-bold text-sm flex justify-center items-center ${isProcessing ? 'opacity-70 cursor-not-allowed hover:bg-luxury-gold hover:text-white' : ''}`}
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
                        <div className="bg-luxury-black p-8 shadow-sm border border-luxury-gray sticky top-32">
                            <h2 className="text-xl font-serif text-white uppercase tracking-widest mb-6 border-b border-luxury-gray pb-4">Order Summary</h2>

                            <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="bg-white p-2 shrink-0 border border-luxury-gray">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-white leading-snug">{item.name}</h3>
                                            <p className="text-xs text-luxury-text-gray tracking-widest uppercase mt-1 mb-2">{item.brand}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs tracking-widest uppercase text-luxury-text-gray">Qty: {item.quantity}</span>
                                                <span className="font-medium tracking-wider text-luxury-gold">${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-luxury-gray pt-6 space-y-4">
                                <div className="flex justify-between text-sm tracking-widest uppercase text-luxury-text-gray">
                                    <span>Subtotal</span>
                                    <span className="text-white">${totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm tracking-widest uppercase text-luxury-text-gray">
                                    <span>Shipping</span>
                                    <span className="text-white">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-sm tracking-widest uppercase text-luxury-text-gray">
                                    <span>Estimated Tax</span>
                                    <span className="text-white">Calculated locally</span>
                                </div>
                                <div className="flex justify-between items-center text-lg tracking-widest uppercase font-bold text-white pt-6 mt-4 border-t border-luxury-gray">
                                    <span>Total</span>
                                    <span className="text-luxury-gold">${totalAmount.toLocaleString()}</span>
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
