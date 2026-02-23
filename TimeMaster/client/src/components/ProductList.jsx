import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import SidebarFilter from './SidebarFilter';
import Pagination from './Pagination';
import useProducts from '../hooks/useProducts';

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const initialBrand = searchParams.get('brand');

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const [filters, setFilters] = useState({
        brands: initialBrand ? [initialBrand] : [],
        categories: [],
        minPrice: '',
        maxPrice: '',
        sort: 'newest',
        keyword: '',
        pageNumber: 1
    });

    // Sync with URL changes (e.g., clicking Mega Menu while already on Collection page)
    useEffect(() => {
        const brand = searchParams.get('brand');
        setFilters(prev => ({
            ...prev,
            brands: brand ? [brand] : [],
            pageNumber: 1 // Reset pagination on brand change
        }));
    }, [searchParams]);

    const { products, page, pages, count, loading, error } = useProducts(filters);

    const handleSearchForm = (e) => {
        e.preventDefault();
        setFilters(prev => ({ ...prev, keyword: searchInput, pageNumber: 1 }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, pageNumber: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return (
        <div className="min-h-screen bg-luxury-dark pt-32 pb-16 px-4 md:px-8 lg:px-16">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 tracking-widest uppercase">THE COLLECTION</h2>
                    <div className="h-px w-24 bg-luxury-gold mx-auto mb-8"></div>
                    <p className="text-luxury-text-gray max-w-2xl mx-auto font-light tracking-wide">
                        Discover our curated selection of the world's finest timepieces.
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                    <p className="text-white text-sm tracking-widest uppercase">{products.length} Results</p>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="px-4 py-2 border border-luxury-gray text-white text-xs tracking-widest uppercase hover:bg-white hover:text-luxury-black transition-colors flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                        Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar */}
                    <SidebarFilter
                        filters={filters}
                        setFilters={setFilters}
                        isOpen={isSidebarOpen}
                        setIsOpen={setIsSidebarOpen}
                    />

                    {/* Main Content Area */}
                    <div className="flex-1">

                        {/* Search Bar */}
                        <form onSubmit={handleSearchForm} className="mb-8 flex">
                            <input
                                type="text"
                                placeholder="Search by model or collection..."
                                className="flex-1 bg-luxury-black border border-luxury-gray text-white px-4 py-4 focus:outline-none focus:border-luxury-gold transition-colors tracking-wide placeholder-luxury-text-gray"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-luxury-gold text-white px-8 font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-luxury-black transition-colors"
                            >
                                Search
                            </button>
                        </form>

                        {/* Sort Dropdown (Desktop) */}
                        <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-luxury-gray">
                            <p className="text-luxury-text-gray text-sm tracking-widest uppercase">
                                {count} {count === 1 ? 'Result' : 'Results'}
                            </p>
                            <div className="flex items-center space-x-4">
                                <label className="text-xs text-luxury-text-gray tracking-widest uppercase">Sort By</label>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                    className="bg-luxury-black border border-luxury-gray text-white text-sm px-4 py-2 focus:outline-none focus:border-luxury-gold tracking-wider cursor-pointer"
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Mobile Sort Menu */}
                        <div className="lg:hidden mb-8">
                            <select
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                className="w-full bg-luxury-black border border-luxury-gray text-white text-sm px-4 py-3 focus:outline-none focus:border-luxury-gold tracking-wider cursor-pointer uppercase"
                            >
                                <option value="newest">Sort By: Newest</option>
                                <option value="price_asc">Sort By: Price Low-High</option>
                                <option value="price_desc">Sort By: Price High-Low</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center py-20 bg-luxury-black border border-luxury-gray">
                                <p className="text-red-500 text-sm tracking-wider uppercase">{error}</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 bg-luxury-black border border-luxury-gray">
                                <p className="text-white tracking-widest uppercase mb-4">No products found</p>
                                <p className="text-luxury-text-gray text-sm">Try adjusting your filters or search criteria.</p>
                                <button
                                    onClick={() => setFilters({ brands: [], categories: [], minPrice: '', maxPrice: '', sort: 'newest' })}
                                    className="mt-6 px-6 py-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white transition-colors text-xs uppercase tracking-widest"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                                <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
