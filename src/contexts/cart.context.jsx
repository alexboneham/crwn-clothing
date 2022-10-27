import { createContext, useEffect, useReducer } from 'react';

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
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload,
      };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const setCartItems = (items) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: items });
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, next) => acc + next.quantity, 0);
    dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: newCartCount });
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((acc, next) => acc + next.price * next.quantity, 0);
    dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: newCartTotal });
  }, [cartItems]);

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
