import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            state.push(action.payload)
        },
        updateCart: (state, action) => {
            state.filter(item => item !== action.payload)
        },
    }
});

export const { setCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;