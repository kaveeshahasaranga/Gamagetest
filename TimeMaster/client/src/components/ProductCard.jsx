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
            className="bg-white group cursor-pointer border border-transparent hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            <div className="relative overflow-hidden aspect-square w-full bg-white flex items-center justify-center p-4">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
            </div>

            <div className="p-6 text-center flex-grow flex flex-col">
                <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-2">{product.brand}</p>
                <h3 className="text-sm md:text-base font-serif text-black mb-2 leading-snug flex-grow">{product.name}</h3>

                {/* Rating Display */}
                <div className="flex justify-center items-center mb-4">
                    <div className="flex text-red-700 mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-3 h-3 ${product.rating >= star ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-gray-500 text-[9px] font-bold tracking-widest uppercase">
                        ({product.numReviews})
                    </span>
                </div>

                <p className="text-black font-semibold mb-6 tracking-widest">${product.price.toLocaleString()}</p>

                <div className="mt-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        className="w-full py-3 px-4 bg-transparent border border-gray-300 text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 uppercase tracking-widest text-[10px] font-bold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
