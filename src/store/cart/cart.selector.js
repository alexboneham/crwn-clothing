import { createSelector } from 'reselect';

// Get the reducer
const selectCartReducer = (state) => state.cart;

// Create memoized selector for getting isCartOpen
export const selectIsCartOpen = createSelector([selectCartReducer], (cartSlice) => cartSlice.isCartOpen);

// Create memoized selector for cartItems
export const selectCartItems = createSelector([selectCartReducer], (cartSlice) => {
  return cartSlice.cartItems;
});

// Create memoized selector for cart total
export const selectCartTotal = createSelector([selectCartItems], (items) => {
  return items.reduce((acc, next) => {
    return acc + next.price * next.quantity;
  }, 0);
});

// Create memoized selector for cart count
export const selectCartCount = createSelector([selectCartItems], (items) => {
  return items.reduce((acc, next) => {
    return acc + next.quantity;
  }, 0);
});
