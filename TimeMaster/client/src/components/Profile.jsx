import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '../redux/slices/authSlice';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            const fetchOrders = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    };
                    const { data } = await axios.get('/api/orders/myorders', config);
                    setOrders(data);
                    setLoadingOrders(false);
                } catch (error) {
                    console.error('Error fetching orders', error);
                    setLoadingOrders(false);
                }
            };

            fetchOrders();
        }
    }, [userInfo, navigate]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    if (!userInfo) return null;

    return (
        <div className="pt-32 pb-20 min-h-[90vh] bg-luxury-dark px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif text-white font-bold tracking-widest uppercase mb-2">MY ACCOUNT</h1>
                <p className="text-luxury-text-gray mb-10 tracking-widest">Manage your profile and order history.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 border border-luxury-gray bg-luxury-black p-6 shadow-sm h-fit">
                        <div className="mb-6 pb-6 border-b border-luxury-gray">
                            <h2 className="text-xl font-semibold text-white mb-1 tracking-wider">{userInfo.name}</h2>
                            <p className="text-sm text-luxury-text-gray">{userInfo.email}</p>
                            {userInfo.role === 'admin' && (
                                <span className="inline-block mt-3 px-3 py-1 bg-luxury-gold text-white text-xs tracking-widest uppercase font-bold">Admin</span>
                            )}
                        </div>

                        <nav className="space-y-4 tracking-widest uppercase text-sm font-semibold">
                            <a href="#" className="block text-luxury-gold">Order History</a>
                            <a href="#" className="block text-luxury-text-gray hover:text-white transition-colors">Account Details</a>
                            <button
                                onClick={handleLogout}
                                className="block text-red-500 hover:text-red-400 transition-colors mt-8 pt-4 border-t border-luxury-gray w-full text-left uppercase tracking-widest text-sm font-semibold"
                            >
                                Sign Out
                            </button>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 bg-luxury-black p-8 shadow-sm border border-luxury-gray">
                        <h2 className="text-2xl font-serif text-white font-semibold tracking-widest uppercase mb-6">Order History</h2>

                        {loadingOrders ? (
                            <div className="flex justify-center p-10">
                                <svg className="animate-spin h-8 w-8 text-luxury-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-10">
                                <svg className="mx-auto h-12 w-12 text-luxury-text-gray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <h3 className="text-lg font-medium text-white tracking-widest uppercase">No orders yet</h3>
                                <p className="mt-2 text-sm text-luxury-text-gray">When you make a purchase, your orders will appear here.</p>
                                <div className="mt-8">
                                    <button
                                        onClick={() => navigate('/collection')}
                                        className="px-6 py-3 border border-luxury-gray text-luxury-text-gray hover:bg-white hover:text-luxury-black hover:border-white transition-colors text-sm uppercase tracking-widest font-semibold"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="border border-luxury-gray p-6 bg-luxury-dark/50">
                                        <div className="flex justify-between items-center border-b border-luxury-gray pb-4 mb-4">
                                            <div>
                                                <p className="text-xs text-luxury-text-gray uppercase tracking-widest mb-1">Order Placed</p>
                                                <p className="text-sm font-medium text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-luxury-text-gray uppercase tracking-widest mb-1">Total</p>
                                                <p className="text-sm font-medium text-luxury-gold tracking-wider">${order.totalAmount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-luxury-text-gray uppercase tracking-widest mb-1">Status</p>
                                                <p className={`text-sm font-bold tracking-wider uppercase ${order.deliveryStatus === 'Delivered' ? 'text-green-500' : 'text-luxury-gold'}`}>
                                                    {order.deliveryStatus}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {order.products.map((item, index) => (
                                                <div key={index} className="flex gap-4 items-center">
                                                    {item.productId?.images && item.productId.images.length > 0 ? (
                                                        <div className="bg-white p-1 shrink-0">
                                                            <img src={item.productId.images[0]} alt={item.productId.name} className="w-12 h-12 object-contain" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 bg-luxury-gray flex items-center justify-center text-xs text-luxury-text-gray shrink-0">NA</div>
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-white">{item.productId?.name || 'Unknown Product'}</p>
                                                        <p className="text-xs text-luxury-text-gray mt-1 tracking-widest uppercase">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
