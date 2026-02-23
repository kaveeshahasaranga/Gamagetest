import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
    if (pages <= 1) return null;

    return (
        <div className="flex flex-wrap justify-center mt-16 gap-2">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 border border-luxury-gray text-sm tracking-widest uppercase transition-colors ${page === 1 ? 'opacity-50 cursor-not-allowed text-luxury-text-gray' : 'text-white hover:border-luxury-gold hover:text-luxury-gold'
                    }`}
            >
                Prev
            </button>

            {[...Array(pages).keys()].map(x => (
                <button
                    key={x + 1}
                    onClick={() => onPageChange(x + 1)}
                    className={`w-10 h-10 border transition-colors flex justify-center items-center text-sm font-medium ${x + 1 === page
                            ? 'bg-luxury-gold border-luxury-gold text-white'
                            : 'bg-transparent border-luxury-gray text-luxury-text-gray hover:border-white hover:text-white'
                        }`}
                >
                    {x + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === pages}
                className={`px-4 py-2 border border-luxury-gray text-sm tracking-widest uppercase transition-colors ${page === pages ? 'opacity-50 cursor-not-allowed text-luxury-text-gray' : 'text-white hover:border-luxury-gold hover:text-luxury-gold'
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
