import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

/*
  Helper functions for cart store
*/

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) =>
  cartItems.filter((item) => item.id !== productToRemove.id);

export const removeSingleItemFromCart = (cartItems, productToChange) => {
  if (productToChange.quantity > 1) {
    return cartItems.map((item) => (item.id === productToChange.id ? { ...item, quantity: item.quantity - 1 } : item));
  }
  return removeCartItem(cartItems, productToChange);
};

// Actions
export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const setCartItems = (newItems) => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newItems);

export const addItemToCart = (cartItems, product) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, product));
export const removeItemFromCart = (cartItems, product) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, product));
export const decrementItemFromCart = (cartItems, product) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeSingleItemFromCart(cartItems, product));
