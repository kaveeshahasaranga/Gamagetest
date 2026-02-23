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
            {/* Hero Top Banner - Inspired by 'Performance. Value.' */}
            <section className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-r from-[#1a3b1a] to-[#2d4a22] overflow-hidden flex items-center">
                {/* Background Texture/Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 text-left mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold tracking-tight mb-2 uppercase leading-none">
                            Performance. <br /> Value.
                        </h1>
                        <p className="text-sm md:text-base text-gray-300 tracking-widest uppercase mb-8 font-semibold">
                            Anix Latest Sri Lanka's Youth Lifestyle Brand
                        </p>

                        <div className="flex items-center space-x-4">
                            <Link
                                to="/collection"
                                className="inline-block px-8 py-3 bg-[#0d6efd] text-white font-bold text-xs rounded-sm hover:bg-blue-700 transition"
                            >
                                CREDIT CARD INSTALMENT PLANS ON <br /> <span className="text-[10px] font-normal tracking-wider">Discover Collection</span>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-4 lg:pr-12">
                        <img
                            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800"
                            alt="Luxury Men's Watch"
                            className="w-48 md:w-80 lg:w-96 object-cover aspect-square rounded-full drop-shadow-2xl border-4 border-[#2d4a22]"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Brands Banner */}
            <section className="py-16 border-b border-luxury-gray bg-luxury-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs tracking-[0.3em] text-luxury-text-gray uppercase mb-8">Authorised Retailer For</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70">
                        {['ROLEX', 'PATEK PHILIPPE', 'AUDEMARS PIGUET', 'OMEGA', 'CARTIER'].map((brand) => (
                            <div key={brand} className="font-serif text-xl md:text-2xl tracking-[0.2em] text-white hover:text-luxury-gold transition-colors cursor-pointer">
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-luxury-black">
                    <h2 className="text-3xl font-light tracking-wide uppercase mb-2">
                        Men's <span className="text-xl text-gray-400 mx-2">|</span> <span className="text-sm font-semibold tracking-widest text-gray-500">PRECISION, QUALITY, INNOVATION</span>
                    </h2>

                    {loading ? (
                        <p className="py-10">Loading Men's Collection...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10">
                            {menProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-10">
                        <Link to="/collection?category=Men" className="inline-block px-10 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors rounded-full">
                            Men's Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Women's Showcase Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-luxury-black">
                    <h2 className="text-3xl font-light tracking-wide uppercase mb-2">
                        Women's <span className="text-xl text-gray-400 mx-2">|</span> <span className="text-sm font-semibold tracking-widest text-gray-500">STYLE, STATEMENT</span>
                    </h2>

                    {loading ? (
                        <p className="py-10">Loading Women's Collection...</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10">
                            {womenProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="mt-10">
                        <Link to="/collection?category=Women" className="inline-block px-10 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors rounded-full">
                            Women's Collection
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
