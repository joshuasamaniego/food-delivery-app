import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import restaurantsSlice from './slices/restaurantsSlice';
import totalSlice from './slices/totalSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        restaurants: restaurantsSlice,
        total: totalSlice,
    },
})