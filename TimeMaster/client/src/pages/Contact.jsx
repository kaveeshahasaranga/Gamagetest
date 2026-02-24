import React from 'react';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen text-black font-sans pb-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
                    Contact Us
                </h1>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                    We invite you to reach out
                </p>
            </section>

            {/* Contact Grid */}
            <section className="max-w-6xl mx-auto px-6 lg:px-8 mt-16 md:mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">

                    {/* Visit Us */}
                    <div className="flex flex-col items-center text-center p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h3 className="text-sm font-bold tracking-[0.1em] uppercase mb-4">Visit the Boutique</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                            Gamage Watch<br />
                            Main Street<br />
                            Elpitiya, Sri Lanka
                        </p>
                    </div>

                    {/* Call Us */}
                    <div className="flex flex-col items-center text-center p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <h3 className="text-sm font-bold tracking-[0.1em] uppercase mb-4">Speak With Us</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                            T: 077 916 7573<br />
                            T: 091 229 0410
                        </p>
                        <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest">Available Mon - Sat</p>
                    </div>

                    {/* Email Us */}
                    <div className="flex flex-col items-center text-center p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-sm font-bold tracking-[0.1em] uppercase mb-4">Email</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                            Direct inquiries to our client services team.
                        </p>
                        <a href="mailto:gamagewatches@gmail.com" className="text-sm font-semibold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                            gamagewatches@gmail.com
                        </a>
                    </div>
                </div>
            </section>

            {/* Map / Image divider */}
            <section className="w-full h-64 md:h-96 mt-20 bg-gray-50 overflow-hidden relative">
                <img
                    src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=2000"
                    alt="Boutique interior"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                />
            </section>

            {/* Social Media Links */}
            <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-20 text-center">
                <h2 className="text-2xl font-serif font-light mb-10 tracking-wide">
                    Follow Our Journey
                </h2>
                <div className="flex justify-center space-x-8 md:space-x-16">
                    <a href="https://www.instagram.com/gamagewatches/?hl=en" target="_blank" rel="noreferrer" className="text-black hover:text-gray-500 transition-colors flex flex-col items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        <span className="text-[10px] tracking-widest uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                    </a>
                    <a href="https://web.facebook.com/Gamegewatches/?_rdc=1&_rdr#" target="_blank" rel="noreferrer" className="text-black hover:text-gray-500 transition-colors flex flex-col items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        <span className="text-[10px] tracking-widest uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
                    </a>
                    <a href="https://youtube.com/@rustystories?si=n2cSlbNi7sLgFbdB" target="_blank" rel="noreferrer" className="text-black hover:text-gray-500 transition-colors flex flex-col items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                        <span className="text-[10px] tracking-widest uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity">YouTube</span>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Contact;
