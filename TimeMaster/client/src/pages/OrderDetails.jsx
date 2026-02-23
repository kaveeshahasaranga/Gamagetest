import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

// Initialize Stripe outside component to avoid recreating it
const stripePromise = loadStripe('pk_test_51PLACEHOLDER_KEY_DO_NOT_USE_IN_PRODUCTION');

const OrderDetails = () => {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchOrder = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`/api/orders/${orderId}`, config);
                setOrder(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, userInfo, navigate]);

    useEffect(() => {
        if (order && order.paymentMethod === 'Bank Card' && order.paymentStatus !== 'Paid' && !clientSecret) {
            const getClientSecret = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    };
                    const { data } = await axios.post('/api/payment/create-payment-intent', { orderId }, config);
                    setClientSecret(data.clientSecret);
                } catch (err) {
                    console.error("Failed to get client secret", err);
                }
            };
            getClientSecret();
        }
    }, [order, orderId, userInfo, clientSecret]);

    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-dark pt-32 pb-16 flex justify-center items-start">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-luxury-dark pt-32 px-4 md:px-8 max-w-4xl mx-auto flex items-start justify-center">
                <div className="bg-luxury-black border border-luxury-gray p-8 text-center mt-10 w-full">
                    <p className="text-red-500 tracking-widest uppercase mb-4">{error}</p>
                    <button onClick={() => navigate('/profile')} className="text-luxury-gold uppercase tracking-widest text-xs hover:text-white transition-colors">
                        Return to Profile
                    </button>
                </div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="min-h-screen bg-luxury-dark pt-32 pb-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-serif text-white tracking-widest uppercase mb-1">Order Details</h1>
                        <p className="text-xs text-luxury-text-gray tracking-widest uppercase">ID: {order._id}</p>
                    </div>
                    <button onClick={() => navigate(-1)} className="text-luxury-text-gray tracking-widest uppercase text-xs hover:text-white transition-colors">
                        Go Back
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Order Metadata & Items */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-luxury-black border border-luxury-gray p-6">
                            <h2 className="text-sm tracking-widest text-luxury-text-gray uppercase mb-4">Customer Info</h2>
                            <p className="text-white mb-1"><span className="text-luxury-gold font-semibold uppercase text-xs tracking-wider">Name:</span> {order.userId?.name || 'Unknown'}</p>
                            <p className="text-white mb-1"><span className="text-luxury-gold font-semibold uppercase text-xs tracking-wider">Email:</span> {order.userId?.email || 'Unknown'}</p>
                            <p className="text-white"><span className="text-luxury-gold font-semibold uppercase text-xs tracking-wider">Method:</span> Digital Receipt / Store Pickup</p>
                        </div>

                        <div className="bg-luxury-black border border-luxury-gray p-6">
                            <h2 className="text-sm tracking-widest text-luxury-text-gray uppercase mb-4">Payment Info</h2>
                            <p className="text-white mb-1"><span className="text-luxury-gold font-semibold uppercase text-xs tracking-wider">Method:</span> {order.paymentMethod}</p>
                            <p className="text-white">
                                <span className="text-luxury-gold font-semibold uppercase text-xs tracking-wider">Status: </span>
                                <span className={`${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>{order.paymentStatus}</span>
                            </p>
                        </div>

                        <div className="bg-luxury-black border border-luxury-gray p-6">
                            <h2 className="text-sm tracking-widest text-luxury-text-gray uppercase mb-6">Order Items</h2>
                            {order.products.length === 0 ? (
                                <p className="text-white">Order is empty.</p>
                            ) : (
                                <div className="space-y-6 flex flex-col">
                                    {order.products.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 border-b border-luxury-gray pb-4 last:border-0 last:pb-0">
                                            <div className="w-16 h-16 bg-white overflow-hidden flex-shrink-0 border border-luxury-gray">
                                                {item.productId && item.productId.images && item.productId.images.length > 0 ? (
                                                    <img src={item.productId.images[0]} alt={item.productId.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-luxury-dark border border-luxury-gray flex items-center justify-center text-xs text-luxury-text-gray">IMG</div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white font-serif">{item.productId ? item.productId.name : 'Unknown Product'}</p>
                                                <p className="text-luxury-text-gray text-xs">{item.quantity} x ${item.productId ? item.productId.price.toLocaleString() : '0'}</p>
                                            </div>
                                            <div className="text-luxury-gold text-sm tracking-wider">
                                                ${(item.quantity * (item.productId ? item.productId.price : 0)).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-luxury-black border border-luxury-gray p-6 sticky top-24">
                            <h2 className="text-sm tracking-widest text-luxury-text-gray uppercase mb-6">Order Summary</h2>
                            <div className="space-y-4 text-sm text-gray-300">
                                <div className="flex justify-between border-b border-luxury-gray pb-4">
                                    <p className="tracking-widest uppercase text-xs">Items Total</p>
                                    <p className="text-white">${order.totalAmount.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between border-b border-luxury-gray pb-4">
                                    <p className="tracking-widest uppercase text-xs">Shipping</p>
                                    <p className="text-white">$0.00</p>
                                </div>
                                <div className="flex justify-between border-b border-luxury-gray pb-4">
                                    <p className="tracking-widest uppercase text-xs">Tax</p>
                                    <p className="text-white">$0.00</p>
                                </div>
                                <div className="flex justify-between items-end pt-2">
                                    <p className="tracking-widest uppercase text-luxury-gold font-semibold">Total</p>
                                    <p className="text-2xl font-serif text-white">${order.totalAmount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-luxury-gray pt-6">
                                <h3 className="text-xs tracking-widest text-luxury-text-gray uppercase mb-3">Delivery Status</h3>
                                <div className={`inline-block px-4 py-2 border text-xs tracking-widest uppercase ${order.deliveryStatus === 'Delivered' ? 'border-green-500 text-green-400' : 'border-luxury-gold text-luxury-gold'}`}>
                                    {order.deliveryStatus}
                                </div>
                            </div>
                        </div>

                        {/* Payment Box */}
                        {order.paymentMethod === 'Bank Card' && order.paymentStatus !== 'Paid' && clientSecret && (
                            <div className="mt-8 bg-luxury-black border border-luxury-gold p-6 text-white shadow-2xl">
                                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#d4af37' } } }}>
                                    <PaymentForm
                                        orderId={order._id}
                                        amount={order.totalAmount}
                                        onSuccess={() => window.location.reload()}
                                    />
                                </Elements>
                            </div>
                        )}

                        {order.paymentStatus === 'Paid' && (
                            <div className="mt-8 bg-green-900/10 border border-green-500/30 p-8 flex flex-col items-center justify-center text-center">
                                <svg className="w-12 h-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h3 className="text-green-400 font-bold tracking-widest text-lg uppercase mb-2">Payment Completed</h3>
                                <p className="text-luxury-text-gray text-xs tracking-wider">Thank you for your purchase. We are preparing your luxury timepiece.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
