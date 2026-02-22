import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OrderManager = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/orders', config);
            setOrders(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            fetchOrders();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const deliverHandler = async (id) => {
        if (window.confirm('Mark this order as delivered?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.put(`/api/orders/${id}/deliver`, {}, config);
                fetchOrders(); // Refresh list to show updated status
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    if (loading) return <div className="text-white">Loading orders...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-white tracking-widest uppercase">Orders</h1>
            </div>

            <div className="overflow-x-auto bg-luxury-black border border-luxury-gray">
                <table className="w-full text-left text-gray-300">
                    <thead className="border-b border-luxury-gray bg-luxury-dark text-xs uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">ID</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">User</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Date</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Total</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Status</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-gray text-sm">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-luxury-dark transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{order._id.substring(18, 24)}</td>
                                {/* Graceful fallback if user was deleted but order remains */}
                                <td className="px-6 py-4 font-medium text-white">{order.userId ? order.userId.name : 'Unknown User'}</td>
                                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">${order.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    {order.deliveryStatus === 'Delivered' ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Delivered
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            {order.deliveryStatus}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button
                                        onClick={() => navigate(`/order/${order._id}`)}
                                        className="text-[10px] border border-luxury-gray text-luxury-text-gray px-3 py-1 uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-colors"
                                    >
                                        Details
                                    </button>
                                    {order.deliveryStatus !== 'Delivered' && (
                                        <button
                                            onClick={() => deliverHandler(order._id)}
                                            className="text-[10px] bg-luxury-gold text-white px-3 py-1 uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-colors"
                                        >
                                            Deliver
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManager;
