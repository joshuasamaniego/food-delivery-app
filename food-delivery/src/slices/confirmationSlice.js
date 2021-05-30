import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: 0,
  company: "",
  total: 0,
};

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setItems, setCompany, setTotal } = confirmationSlice.actions;

export default confirmationSlice.reducer;
