import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import restaurantsSlice from './slices/restaurantsSlice';
import cartSlice from './slices/cartSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        restaurants: restaurantsSlice,
        cart: cartSlice,
    },
})