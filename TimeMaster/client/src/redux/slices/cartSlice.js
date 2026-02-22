import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const initialState = {
    items: cartItemsFromStorage,
    totalAmount: cartItemsFromStorage.reduce((acc, item) => acc + item.price * item.quantity, 0),
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalAmount += action.payload.price;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        decrementQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                state.totalAmount -= existingItem.price;
            } else if (existingItem && existingItem.quantity === 1) {
                state.totalAmount -= existingItem.price;
                state.items = state.items.filter(item => item.id !== id);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
