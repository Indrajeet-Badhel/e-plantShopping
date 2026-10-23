/* eslint-disable react-refresh/only-export-components -- Assignment requires Redux exports in CartSlice.jsx. */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(item => item.name === action.payload.name);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      if (!Number.isInteger(quantity) || quantity < 0) return;
      if (quantity === 0) {
        state.items = state.items.filter(item => item.name !== name);
        return;
      }
      const item = state.items.find(item => item.name === name);
      if (item) item.quantity = quantity;
    },
  },
});
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
