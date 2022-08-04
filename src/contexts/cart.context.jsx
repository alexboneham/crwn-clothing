import { createContext, useState, useEffect } from 'react';

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, next) => acc + next.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((acc, next) => acc + next.price * next.quantity, 0);
    setCartTotal(newCartTotal);
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
