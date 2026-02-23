import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            brand: product.brand,
            quantity: Number(qty)
        }));

        // Optionally flash a success message or open cart drawer here.
        // For now, we'll just navigate to collection or do nothing
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-dark pt-32 flex justify-center items-start">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-luxury-dark pt-32 px-4 flex justify-center items-start">
                <div className="bg-luxury-black border border-luxury-gray p-8 text-center mt-10 w-full max-w-lg">
                    <p className="text-red-500 tracking-widest uppercase mb-4">{error}</p>
                    <button onClick={() => navigate('/collection')} className="text-luxury-gold uppercase tracking-widest text-xs hover:text-white transition-colors">
                        Return to Collection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-luxury-dark pt-32 pb-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-[1400px] mx-auto">
                <button onClick={() => navigate(-1)} className="text-luxury-text-gray tracking-widest uppercase text-xs hover:text-white transition-colors mb-10 inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Selection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start">
                    {/* Left Column: Image Gallery */}
                    <div className="bg-luxury-black border border-luxury-gray aspect-square md:aspect-[4/5] relative flex items-center justify-center p-8 group">
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover shadow-2xl transition-transform duration-700 ease-in-out group-hover:scale-105"
                            />
                        ) : (
                            <div className="text-luxury-text-gray tracking-widest uppercase">No Image Available</div>
                        )}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="flex flex-col justify-center h-full py-4 lg:py-10">
                        <p className="text-luxury-text-gray tracking-widest uppercase text-sm font-semibold mb-3">{product.brand}</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">{product.name}</h1>
                        <p className="text-2xl font-serif text-luxury-gold tracking-wider mb-8">${product.price?.toLocaleString()}</p>

                        <div className="h-px w-full bg-luxury-gray mb-8"></div>

                        <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-2xl text-sm md:text-base">
                            {product.description || "An exquisite timepiece engineered with precision and elegance. Experience the pinnacle of horological craftsmanship."}
                        </p>

                        <div className="mb-10">
                            <h3 className="text-xs tracking-widest text-luxury-text-gray uppercase mb-3">Availability</h3>
                            {product.stockCount > 0 ? (
                                <p className="text-green-500 text-sm tracking-widest uppercase font-semibold">In Stock</p>
                            ) : (
                                <p className="text-red-500 text-sm tracking-widest uppercase font-semibold">Out of Stock</p>
                            )}
                        </div>

                        {product.stockCount > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <div className="border border-luxury-gray bg-luxury-black flex items-center px-4 w-fit">
                                    <span className="text-xs tracking-widest text-luxury-text-gray uppercase mr-4">QTY</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                        className="bg-transparent text-white focus:outline-none py-3 pr-4 cursor-pointer"
                                    >
                                        {[...Array(product.stockCount).keys()].map(x => (
                                            <option key={x + 1} value={x + 1} className="bg-luxury-black text-white">
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-luxury-gold text-white tracking-widest uppercase font-semibold py-4 px-8 hover:bg-white hover:text-luxury-black transition-colors duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        )}

                        {/* Product Metdata Accordions / Details */}
                        <div className="space-y-4 border-t border-luxury-gray pt-8">
                            <div className="flex justify-between items-center text-sm py-2">
                                <span className="text-luxury-text-gray tracking-widest uppercase text-xs">Category</span>
                                <span className="text-white uppercase tracking-wider">{product.category}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-t border-luxury-gray/50">
                                <span className="text-luxury-text-gray tracking-widest uppercase text-xs">Shipping</span>
                                <span className="text-white uppercase tracking-wider text-xs">Complimentary Overnight</span>
                            </div>
                            <div className="flex justify-between items-center text-sm py-2 border-t border-luxury-gray/50">
                                <span className="text-luxury-text-gray tracking-widest uppercase text-xs">Warranty</span>
                                <span className="text-white uppercase tracking-wider text-xs">5-Year International</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
