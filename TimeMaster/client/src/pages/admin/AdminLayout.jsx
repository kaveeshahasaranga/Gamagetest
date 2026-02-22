import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Products', path: '/admin/products' },
        { name: 'Orders', path: '/admin/orders' },
        { name: 'Users', path: '/admin/users' },
    ];

    return (
        <div className="min-h-screen bg-luxury-dark pt-24 px-4 md:px-8 flex flex-col lg:flex-row gap-8">
            {/* Admin Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-luxury-black border border-luxury-gray p-6 sticky top-28">
                    <h2 className="text-xl font-serif text-white tracking-widest uppercase mb-8 border-b border-luxury-gray pb-4">
                        Admin Portal
                    </h2>
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-4 py-3 text-sm tracking-widest uppercase transition-colors flex items-center ${isActive
                                            ? 'bg-luxury-gold text-white font-semibold'
                                            : 'text-luxury-text-gray hover:bg-luxury-dark hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Admin Main Content Area */}
            <main className="flex-1 bg-luxury-black border border-luxury-gray p-6 lg:p-10 mb-8 min-h-[500px]">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
