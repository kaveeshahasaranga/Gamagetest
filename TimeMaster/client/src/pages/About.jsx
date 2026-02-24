import React from 'react';

const About = () => {
    return (
        <div className="bg-white min-h-screen text-black font-sans pb-20">
            {/* Cinematic Hero */}
            <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000"
                    alt="Watchmaker craft"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center px-4 mt-10">
                    <h1 className="text-white text-4xl md:text-6xl font-serif font-light mb-4 drop-shadow-md">
                        Our Legacy
                    </h1>
                    <p className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase drop-shadow-md">
                        Precision. Quality. Innovation.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-20 text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-light mb-10 tracking-wide text-black">
                    A Tradition of Excellence since Inception
                </h2>

                <div className="space-y-8 text-sm md:text-base text-gray-600 leading-loose tracking-wide font-light text-justify md:text-center">
                    <p>
                        Welcome to GAMAGE Watches, Sri Lanka's leading youth lifestyle brand and an authorized retailer for the world’s most prestigious timepieces. Located in the heart of Elpitiya, we have dedicated ourselves to curating collections that blend timeless elegance with modern sophistication.
                    </p>
                    <p>
                        Our philosophy is deeply rooted in the belief that a watch is more than just an instrument to tell time; it is a statement of personal style, an heirloom of enduring value, and a masterpiece of micro-engineering. Whether you seek the pioneering spirit of Omega, the robust reliability of Rolex, or the avant-garde designs of our extensive catalog, we provide unparalleled expertise to help you find your perfect match.
                    </p>
                    <p>
                        With a commitment to "Performance and Value", we not only offer exceptional products but also an experience tailored to the modern connoisseur. Our newly refined online boutique and our welcoming physical store stand as testaments to our passion for horology and our dedication to customer satisfaction.
                    </p>
                </div>

                <div className="mt-20 border-t border-gray-200 pt-16">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                        Authorized Retailer
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                        {['ROLEX', 'PATEK PHILIPPE', 'OMEGA', 'CARTIER'].map((brand) => (
                            <div key={brand} className="font-serif text-lg tracking-[0.2em] text-black">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
