import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-luxury-black group cursor-pointer border border-luxury-gray shadow-sm hover:shadow-xl hover:border-luxury-gold transition-all duration-300"
        >
            <div className="relative overflow-hidden aspect-square w-full bg-luxury-dark">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>

            <div className="p-6 text-center">
                <p className="text-xs text-luxury-text-gray tracking-widest uppercase mb-2">{product.brand}</p>
                <h3 className="text-lg font-serif text-white mb-2 leading-snug">{product.name}</h3>

                {/* Rating Display */}
                <div className="flex justify-center items-center mb-3">
                    <div className="flex text-luxury-gold mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-3 h-3 ${product.rating >= star ? 'fill-current' : 'text-luxury-gray fill-transparent stroke-current'}`} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-luxury-text-gray text-[10px] tracking-widest uppercase">
                        ({product.numReviews})
                    </span>
                </div>

                <p className="text-luxury-gold font-medium mb-5 tracking-wider">${product.price.toLocaleString()}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                    }}
                    className="w-full py-3 px-4 bg-transparent border border-luxury-gray text-luxury-text-gray hover:bg-white hover:text-luxury-black hover:border-white transition-colors duration-300 uppercase tracking-widest text-xs font-semibold"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
