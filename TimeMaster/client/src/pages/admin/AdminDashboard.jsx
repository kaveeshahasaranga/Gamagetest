import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-serif text-white tracking-widest uppercase mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-luxury-gray p-6 bg-luxury-dark text-center">
                    <h3 className="text-luxury-text-gray text-xs tracking-widest uppercase mb-2">Total Sales</h3>
                    <p className="text-3xl font-serif text-luxury-gold">$0.00</p>
                </div>
                <div className="border border-luxury-gray p-6 bg-luxury-dark text-center">
                    <h3 className="text-luxury-text-gray text-xs tracking-widest uppercase mb-2">Active Orders</h3>
                    <p className="text-3xl font-serif text-white">0</p>
                </div>
                <div className="border border-luxury-gray p-6 bg-luxury-dark text-center">
                    <h3 className="text-luxury-text-gray text-xs tracking-widest uppercase mb-2">Total Products</h3>
                    <p className="text-3xl font-serif text-white">0</p>
                </div>
            </div>

            <div className="mt-12 border border-luxury-gray p-6 bg-luxury-dark flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-luxury-text-gray tracking-widest text-sm uppercase">Select a module from the sidebar to manage the store.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
