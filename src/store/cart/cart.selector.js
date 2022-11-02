import { createSelector } from 'reselect';

// Get the reducer
const selectCartReducer = (state) => state.cart;

// Create memoized selector for getting isCartOpen
export const selectIsCartOpen = createSelector([selectCartReducer], (cartSlice) => cartSlice.isCartOpen);

