
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => { 
            const ItemInCart = state.items.find(item => item.id === action.payload.id);
            if (ItemInCart) {
                ItemInCart.quantity += 1;
            } else {
                const itemWithQuantity = { ...action.payload, quantity: 1 };
                state.items.push(itemWithQuantity);
            }
        },
        removeItem: (state, action) => { 
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;