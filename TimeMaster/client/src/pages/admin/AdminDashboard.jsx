import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        totalProducts: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('/api/admin/stats', config);
                setStats(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo && userInfo.role === 'admin') {
            fetchStats();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    if (loading) return <div className="text-white">Loading dashboard stats...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-serif text-white tracking-widest uppercase mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-luxury-gray p-6 bg-luxury-dark text-center">
                    <h3 className="text-luxury-text-gray text-xs tracking-widest uppercase mb-2">Total Sales</h3>
                    <p className="text-3xl font-serif text-luxury-gold">${stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="border border-luxury-gray p-6 bg-luxury-dark text-center">
                    <h3 className="text-luxury-text-gray text-xs tracking-widest uppercase mb-2">Active Orders</h3>
                    <p className="text-3xl font-serif text-white">{stats.activeOrders}</p>
                </div>
                <div className="border border-luxury-gray p-6 bg-luxury-dark text-center">
                    <h3 className="text-luxury-text-gray text-xs tracking-widest uppercase mb-2">Total Products</h3>
                    <p className="text-3xl font-serif text-white">{stats.totalProducts}</p>
                </div>
            </div>

            <div className="mt-12 border border-luxury-gray p-6 bg-luxury-dark flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-luxury-text-gray tracking-widest text-sm uppercase">Select a module from the sidebar to manage the store.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
