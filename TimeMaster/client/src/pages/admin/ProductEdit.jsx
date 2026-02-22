import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductEdit = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [stockCount, setStockCount] = useState(0);
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.images[0] || '');
                setBrand(data.brand);
                setCategory(data.category);
                setStockCount(data.stockCount);
                setDescription(data.description);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userInfo && userInfo.role === 'admin') {
            fetchProduct();
        } else {
            navigate('/login');
        }
    }, [productId, userInfo, navigate]);

    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`, // Re-using admin token for security
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (err) {
            console.error(err);
            setUploading(false);
            alert('Image upload failed: ' + (err.response?.data?.message || err.message));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.put(
                `/api/products/${productId}`,
                {
                    name,
                    price,
                    images: [image], // Temporarily supporting just 1 image string input for simplicity
                    brand,
                    category,
                    stockCount,
                    description,
                },
                config
            );

            navigate('/admin/products');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="text-white">Loading product data...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-serif text-white tracking-widest uppercase">Edit Product</h1>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="text-luxury-text-gray tracking-widest uppercase text-xs hover:text-white transition-colors"
                >
                    Go Back
                </button>
            </div>

            <form onSubmit={submitHandler} className="space-y-6 bg-luxury-black border border-luxury-gray p-8">
                <div>
                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Stock Count</label>
                        <input
                            type="number"
                            value={stockCount}
                            onChange={(e) => setStockCount(e.target.value)}
                            className="w-full bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Product Image</label>
                    <div className="flex flex-col space-y-3">
                        {image && (
                            <img src={image} alt="Product Preview" className="w-32 h-32 object-cover border border-luxury-gray rounded-sm bg-black" />
                        )}
                        <input
                            type="file"
                            id="image-file"
                            onChange={uploadFileHandler}
                            className="bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-luxury-gold file:text-white file:uppercase file:tracking-widest file:cursor-pointer hover:file:bg-white hover:file:text-black"
                        />
                        {uploading && <span className="text-luxury-text-gray text-xs tracking-widest uppercase">Uploading image...</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold tracking-widest text-luxury-text-gray uppercase mb-2">Description</label>
                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-luxury-dark border border-luxury-gray text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors"
                        required
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-luxury-gold text-white px-6 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-luxury-black transition-colors"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEdit;
