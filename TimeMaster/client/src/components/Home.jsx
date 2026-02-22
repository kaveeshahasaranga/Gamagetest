import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-luxury-dark min-h-screen text-white">
            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center text-center px-4">
                    <div className="z-10 bg-black/50 p-12 lg:p-24 border border-white/10 backdrop-blur-sm mt-20">
                        <h1 className="text-5xl md:text-7xl text-white font-serif tracking-[0.2em] mb-6 animate-fade-in-up uppercase">
                            GAMAGE
                        </h1>
                        <p className="text-lg md:text-xl text-luxury-text-gray mb-10 max-w-2xl font-light tracking-[0.1em] mx-auto">
                            Elevate your style with our premium collection of luxury timepieces.
                        </p>

                        <Link
                            to="/collection"
                            className="inline-block px-10 py-4 bg-transparent border border-white text-white font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-luxury-black transition duration-300 ease-in-out text-sm"
                        >
                            Discover Collection
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
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

            {/* Featured Collection Teaser */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase mb-4">Timeless Elegance</h2>
                    <div className="h-px w-24 bg-luxury-gold mx-auto mb-6"></div>
                    <p className="text-luxury-text-gray tracking-wide max-w-2xl mx-auto">Curated selections that define prestige and exceptional craftsmanship.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Category 1 */}
                    <Link to="/collection" className="group relative h-[500px] overflow-hidden bg-luxury-black border border-luxury-gray">
                        <img
                            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000"
                            alt="Men's Watches"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                            <h3 className="text-2xl font-serif tracking-widest uppercase mb-2">Men's Collection</h3>
                            <p className="text-luxury-gold tracking-widest text-sm uppercase font-semibold flex items-center">
                                Explore <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </p>
                        </div>
                    </Link>

                    {/* Category 2 */}
                    <Link to="/collection" className="group relative h-[500px] overflow-hidden bg-luxury-black border border-luxury-gray">
                        <img
                            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2000"
                            alt="Women's Watches"
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                            <h3 className="text-2xl font-serif tracking-widest uppercase mb-2">Women's Collection</h3>
                            <p className="text-luxury-gold tracking-widest text-sm uppercase font-semibold flex items-center">
                                Explore <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Our Story / Boutique Section */}
            <section className="py-24 border-t border-luxury-gray bg-luxury-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[600px] border border-luxury-gray">
                            <img
                                src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=2000"
                                alt="Watchmaking Craftsmanship"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                        <div className="lg:pl-8">
                            <h2 className="text-3xl md:text-5xl font-serif tracking-widest uppercase mb-6">The GAMAGE Legacy</h2>
                            <div className="h-px w-24 bg-luxury-gold mb-8"></div>
                            <p className="text-luxury-text-gray leading-relaxed tracking-wide mb-6">
                                For over generations, GAMAGE has been the definitive destination for connoisseurs of fine horology. We believe that a watch is more than a timepiece; it is a legacy passed down through generations, an intimate expression of personal style, and a triumph of mechanical engineering.
                            </p>
                            <p className="text-luxury-text-gray leading-relaxed tracking-wide mb-10">
                                Step into our boutique and discover a world of prestige. From the iconic designs of Geneva to the avant-garde innovations of modern horology, our curated selection represents the pinnacle of watchmaking craftsmanship.
                            </p>
                            <Link
                                to="/about"
                                className="inline-block px-8 py-4 border border-luxury-gray text-white font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-luxury-black transition duration-300 ease-in-out text-sm"
                            >
                                Read Our Story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
