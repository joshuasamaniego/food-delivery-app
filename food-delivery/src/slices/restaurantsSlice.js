import { createSlice } from '@reduxjs/toolkit';
import data from '../data/data.json';// go back to empty array when ready for Production

const initialState = {
    restaurants: data.data, // go back to empty array when ready for Production
}

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload
        },
    }
});

export const { setRestaurants } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;