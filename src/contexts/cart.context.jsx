import { createContext, useState, useEffect } from 'react';

/*
  Helper functions for context
*/

export const addCartItem = (cartItems, productToAdd) => {
  // Check if item already in cart
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  // If yes, increment quantity and return new array
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  // If no, add item to cart and return new array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  // Find item in cart and check for validity
  const cartItemToRemove = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
  if (!cartItemToRemove) {
    console.log('Item not found in cart');
    return;
  }
  // Remove item
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const changeItemQuantityInCart = (cartItems, productToChange, actionToPerform) => {
  if (actionToPerform === 'increment') {
    return cartItems.map((item) => (item.id === productToChange.id ? { ...item, quantity: item.quantity + 1 } : item));
  } else if (actionToPerform === 'decrement') {
    if (productToChange.quantity > 1) {
      return cartItems.map((item) =>
        item.id === productToChange.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
    return removeCartItem(cartItems, productToChange);
  } else {
    console.log('Error occured while changing quantity');
    return;
  }
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
  changeCartItemQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Count cart items
    const newCartCount = cartItems.reduce((acc, next) => acc + next.quantity, 0);
    setCartCount(newCartCount);
    // Calculate cart total
    const newCartTotal = cartItems.reduce((acc, next) => acc + next.price * next.quantity, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  // Cart manipulation functions
  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const changeCartItemQuantity = (product, action) => {
    setCartItems(changeItemQuantityInCart(cartItems, product, action));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemFromCart,
    changeCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
