import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserManager = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('/api/users', config);
                setUsers(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo && userInfo.role === 'admin') {
            fetchUsers();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    if (loading) return <div className="text-white">Loading users...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-white tracking-widest uppercase">Users</h1>
                <p className="text-luxury-text-gray tracking-widest text-xs uppercase">Total: {users.length}</p>
            </div>

            <div className="overflow-x-auto bg-luxury-black border border-luxury-gray">
                <table className="w-full text-left text-gray-300">
                    <thead className="border-b border-luxury-gray bg-luxury-dark text-xs uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">ID</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Name</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Email</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray text-center">Admin</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-gray text-sm">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-luxury-dark transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{user._id.substring(18, 24)}</td>
                                <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                                <td className="px-6 py-4 text-luxury-gold">
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {user.role === 'admin' ? (
                                        <svg className="w-5 h-5 text-green-500 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-red-500 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
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

export default UserManager;
