import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, decrementQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';

const CartDrawer = ({ isOpen, toggleCart }) => {
    const { items, totalAmount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckoutClick = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <>
            {/* Overlay Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                    onClick={toggleCart}
                />
            )}

            {/* Slide-out Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-serif text-luxury-black font-semibold tracking-wide">YOUR CART</h2>
                    <button
                        onClick={toggleCart}
                        className="text-gray-400 hover:text-luxury-black transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            Your cart is currently empty.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-gray-50" />

                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-luxury-black mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                                    <p className="font-medium text-luxury-gold">${item.price.toLocaleString()}</p>

                                    <div className="flex items-center justify-between mt-3">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-gray-200">
                                            <button
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className="px-3 py-1 hover:bg-gray-50 text-gray-600 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 text-sm font-medium border-x border-gray-200">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => dispatch(addToCart(item))}
                                                className="px-3 py-1 hover:bg-gray-50 text-gray-600 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Action */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-xs text-red-500 hover:text-red-700 uppercase tracking-wider font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm uppercase tracking-wider text-gray-500">Subtotal</span>
                            <span className="text-xl font-medium text-luxury-black">${totalAmount.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">Standard shipping and taxes calculated at checkout.</p>
                        <button
                            onClick={handleCheckoutClick}
                            className="w-full py-4 bg-luxury-black text-white hover:bg-black transition-colors uppercase tracking-widest text-sm font-semibold"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
