import { configureStore } from '@reduxjs/toolkit';
import  cartReducer from './cartSlice';
import  menuReducer from './menuSlice';


export const store = configureStore({ 
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
    },
});


export default store;