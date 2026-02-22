import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductManager = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            fetchProducts();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`/api/products/${id}`, config);
                fetchProducts();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post('/api/products', {}, config);
            navigate(`/admin/product/${data._id}/edit`);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="text-white">Loading products...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-white tracking-widest uppercase">Products</h1>
                <button
                    onClick={createProductHandler}
                    className="bg-luxury-gold text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-white hover:text-luxury-black transition-colors flex items-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Product
                </button>
            </div>

            <div className="overflow-x-auto bg-luxury-black border border-luxury-gray">
                <table className="w-full text-left text-gray-300">
                    <thead className="border-b border-luxury-gray bg-luxury-dark text-xs uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">ID</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Name</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Price</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Category</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray">Brand</th>
                            <th className="px-6 py-4 font-semibold text-luxury-text-gray text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-gray text-sm">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-luxury-dark transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{product._id.substring(18, 24)}</td>
                                <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                                <td className="px-6 py-4">${product.price.toLocaleString()}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{product.brand}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                        className="text-luxury-text-gray hover:text-white mr-4 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteHandler(product._id)}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManager;
