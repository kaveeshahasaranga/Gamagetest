import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch latest products to use across Trending, Men's, and Women's
                const { data } = await axios.get('/api/products?limit=all');
                setProducts(data.products || data);
            } catch (error) {
                console.error("Failed to fetch products for homepage", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Helper functions to filter products
    const trendingProducts = products.slice(0, 6); // First 6 for trending
    const menProducts = products.filter(p => p.category === 'Men').slice(0, 8);
    const womenProducts = products.filter(p => p.category === 'Women').slice(0, 8);

    return (
        <div className="bg-white min-h-screen text-luxury-black font-sans">
            {/* Cinematic Hero Section - Omega Style */}
            <section className="relative w-full h-[600px] md:h-[80vh] flex items-center justify-center bg-gray-50 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Swiss Watch"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center px-4 flex flex-col items-center mt-16 md:mt-32">
                    <h2 className="text-white text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 drop-shadow-md">
                        The Master Chronometer
                    </h2>
                    <h1 className="text-white text-5xl md:text-7xl font-serif font-light mb-10 drop-shadow-lg">
                        Precision. Redefined.
                    </h1>
                    <Link
                        to="/collection"
                        className="inline-block px-12 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300 shadow-xl"
                    >
                        Discover
                    </Link>
                </div>
            </section>

            {/* Featured Brands Banner */}
            <section className="py-16 border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-8">Authorised Retailer For</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80">
                        {['ROLEX', 'PATEK PHILIPPE', 'AUDEMARS PIGUET', 'OMEGA', 'CARTIER'].map((brand) => (
                            <div key={brand} className="font-serif text-xl md:text-2xl tracking-[0.2em] text-black hover:text-red-700 transition-colors cursor-pointer">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Now Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-luxury-black">
                <div className="flex items-center justify-between mb-8">
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">&larr;</button>
                    <h2 className="text-3xl font-light tracking-wide uppercase">Trending Now</h2>
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">&rarr;</button>
                </div>

                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {loading ? (
                        <p className="text-center w-full">Loading trending...</p>
                    ) : (
                        trendingProducts.map((product) => (
                            <div key={product._id} className="min-w-[200px] md:min-w-[250px] flex-shrink-0">
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Men's Showcase Section */}
            <section className="py-16 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
                    <h2 className="text-3xl font-serif font-light tracking-[0.1em] mb-2">
                        Men's Collection
                    </h2>
                    <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Precision & Innovation</p>

                    {loading ? (
                        <p className="py-10">Loading Men's Collection...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10">
                            {menProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12">
                        <Link to="/collection?category=Men" className="inline-block px-12 py-4 bg-transparent border border-black text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300">
                            Discover Men's Watches
                        </Link>
                    </div>
                </div>
            </section>

            {/* Women's Showcase Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
                    <h2 className="text-3xl font-serif font-light tracking-[0.1em] mb-2">
                        Women's Collection
                    </h2>
                    <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Elegance & Statements</p>

                    {loading ? (
                        <p className="py-10">Loading Women's Collection...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10">
                            {womenProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12">
                        <Link to="/collection?category=Women" className="inline-block px-12 py-4 bg-transparent border border-black text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300">
                            Discover Women's Watches
                        </Link>
                    </div>
                </div>
            </section>

            {/* Static Review Bar */}
            <section className="py-12 bg-white border-t border-b border-gray-200 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-sm font-bold uppercase tracking-widest text-luxury-black">Excellent</p>
                        <div className="flex text-yellow-500 text-2xl">
                            ★★★★★
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">Based on latest reviews • <span className="font-bold text-blue-500">Google</span></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
