import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

/*
  Helper functions for context
*/

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => cartItems.filter((item) => item.id !== productToRemove.id);

const removeSingleItemFromCart = (cartItems, productToChange) => {
  if (productToChange.quantity > 1) {
    return cartItems.map((item) => (item.id === productToChange.id ? { ...item, quantity: item.quantity - 1 } : item));
  }
  return removeCartItem(cartItems, productToChange);
};

/* 
  Configure Context and Provider
*/

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  decrementItemFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
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
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setCartItems = (newItems) => {
    const newCounts = newItems.reduce(
      (acc, next) => {
        return {
          count: acc.count + next.quantity,
          total: acc.total + next.price * next.quantity,
        };
      },
      { count: 0, total: 0 }
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newItems,
        cartCount: newCounts.count,
        cartTotal: newCounts.total,
      })
    );
  };

  const setIsCartOpen = (bool) => dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

  const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));
  const removeItemFromCart = (product) => setCartItems(removeCartItem(cartItems, product));
  const decrementItemFromCart = (product) => setCartItems(removeSingleItemFromCart(cartItems, product));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
