import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const example = state.find((item) => {
        if (item.name === action.payload.name) {
          item.quantity += 1;
        }
        return item.name === action.payload.name;
      });
      if (!example) {
        state.push(action.payload);
      }
    },
    updateCart: (state, action) => {
      return state.filter((item) => item.name !== action.payload.name);
    },
    clearCart: (state, action) => {
      return initialState;
    },
    increase: (state, action) => {
      state.find((item) => {
        if (item.name === action.payload.name) {
          item.quantity += 1;
        }
        return item.name === action.payload.name;
      });
    },
    decrease: (state, action) => {
      state.find((item) => {
        if (item.name === action.payload.name && item.quantity > 1) {
          item.quantity -= 1;
        }
        return item.name === action.payload.name;
      });
    },
  },
});

export const { setCart, updateCart, clearCart, increase, decrease } =
  cartSlice.actions;

export default cartSlice.reducer;
