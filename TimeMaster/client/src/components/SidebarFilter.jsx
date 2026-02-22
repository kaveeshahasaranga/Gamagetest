import React from 'react';

const SidebarFilter = ({ filters, setFilters, isOpen, setIsOpen }) => {

    const availableBrands = ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega', 'Cartier'];
    const availableCategories = ['Men', 'Women', 'Unisex'];

    const handleBrandChange = (brand) => {
        const updatedBrands = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        setFilters({ ...filters, brands: updatedBrands });
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        setFilters({ ...filters, categories: updatedCategories });
    };

    const handlePriceChange = (e, type) => {
        setFilters({ ...filters, [type]: e.target.value });
    };

    const clearFilters = () => {
        setFilters({
            brands: [],
            categories: [],
            minPrice: '',
            maxPrice: '',
            sort: 'newest'
        });
    };

    return (
        <aside className={`w-full lg:w-64 flex-shrink-0 ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-luxury-black border border-luxury-gray p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-serif tracking-widest text-white uppercase">Filters</h3>
                    <button
                        onClick={clearFilters}
                        className="text-xs text-luxury-gold tracking-widest uppercase hover:text-white transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                {/* Brands Filter */}
                <div className="mb-8 border-b border-luxury-gray pb-6">
                    <h4 className="text-sm font-semibold tracking-widest text-luxury-text-gray uppercase mb-4">Brand</h4>
                    <div className="space-y-3">
                        {availableBrands.map((brand) => (
                            <label key={brand} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-luxury-gold bg-luxury-dark border-luxury-gray rounded-sm focus:ring-luxury-gold focus:ring-offset-luxury-black transition duration-150 ease-in-out"
                                    checked={filters.brands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                />
                                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors tracking-wide uppercase">{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="mb-8 border-b border-luxury-gray pb-6">
                    <h4 className="text-sm font-semibold tracking-widest text-luxury-text-gray uppercase mb-4">Category</h4>
                    <div className="space-y-3">
                        {availableCategories.map((category) => (
                            <label key={category} className="flex items-center cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-luxury-gold bg-luxury-dark border-luxury-gray rounded-sm focus:ring-luxury-gold focus:ring-offset-luxury-black transition duration-150 ease-in-out"
                                    checked={filters.categories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors tracking-wide uppercase">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div>
                    <h4 className="text-sm font-semibold tracking-widest text-luxury-text-gray uppercase mb-4">Price Range</h4>
                    <div className="flex items-center space-x-4">
                        <div className="w-1/2">
                            <label className="sr-only">Min Price</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minPrice}
                                onChange={(e) => handlePriceChange(e, 'minPrice')}
                                className="w-full bg-luxury-dark border border-luxury-gray text-white text-sm px-3 py-2 focus:outline-none focus:border-luxury-gold placeholder-luxury-gray"
                            />
                        </div>
                        <span className="text-luxury-text-gray">-</span>
                        <div className="w-1/2">
                            <label className="sr-only">Max Price</label>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxPrice}
                                onChange={(e) => handlePriceChange(e, 'maxPrice')}
                                className="w-full bg-luxury-dark border border-luxury-gray text-white text-sm px-3 py-2 focus:outline-none focus:border-luxury-gold placeholder-luxury-gray"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Close Button (only visible when opened on small screens) */}
                <div className="mt-8 lg:hidden">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 border border-luxury-gray text-white text-xs tracking-widest uppercase hover:bg-white hover:text-luxury-black transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilter;
