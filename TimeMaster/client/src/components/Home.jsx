import React from 'react';

const Home = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center text-center px-4">

                {/* Hero Content */}
                <h1 className="text-4xl md:text-6xl text-white font-serif tracking-wider mb-4 animate-fade-in-up">
                    TIME MASTER
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg font-light tracking-wide">
                    Elevate your style with our premium collection of luxury timepieces.
                </p>

                <button className="px-8 py-3 bg-luxury-gold text-white font-semibold uppercase tracking-widest hover:bg-white hover:text-luxury-black transition duration-300 ease-in-out transform hover:scale-105">
                    Shop Now
                </button>

            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </div>
    );
};

export default Home;
