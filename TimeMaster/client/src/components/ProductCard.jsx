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
        <div className="bg-luxury-black group cursor-pointer border border-luxury-gray shadow-sm hover:shadow-xl hover:border-luxury-gold transition-all duration-300">
            <div className="relative overflow-hidden aspect-square bg-white flex items-center justify-center p-4">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
            </div>

            <div className="p-6 text-center">
                <p className="text-xs text-luxury-text-gray tracking-widest uppercase mb-2">{product.brand}</p>
                <h3 className="text-lg font-serif text-white mb-2 leading-snug">{product.name}</h3>
                <p className="text-luxury-gold font-medium mb-5 tracking-wider">${product.price.toLocaleString()}</p>

                <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 bg-transparent border border-luxury-gray text-luxury-text-gray hover:bg-white hover:text-luxury-black hover:border-white transition-colors duration-300 uppercase tracking-widest text-xs font-semibold"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
