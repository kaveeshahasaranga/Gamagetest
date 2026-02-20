import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            brand: product.brand
        }));
    };

    return (
        <div className="bg-white group cursor-pointer border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>

            <div className="p-6 text-center">
                <p className="text-sm text-gray-500 tracking-widest uppercase mb-1">{product.brand}</p>
                <h3 className="text-lg font-serif text-luxury-black mb-3">{product.name}</h3>
                <p className="text-luxury-gold font-medium mb-4">${product.price.toLocaleString()}</p>

                <button
                    onClick={handleAddToCart}
                    className="w-full py-2 px-4 bg-transparent border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white transition-colors duration-300 uppercase tracking-wider text-sm font-semibold"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
