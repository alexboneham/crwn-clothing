// Action types
import { CART_ACTION_TYPES } from './cart.types';

// Initial state
const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

// Reducer
export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};
