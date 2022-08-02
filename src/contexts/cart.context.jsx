import { createContext, useState, useEffect } from 'react';

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

  // If quantity is 1 or less, remove item
  const itemIndex = cartItems.findIndex((item) => item.id === productToRemove.id);
  if (!productToRemove.quantity > 1) {
    const newArr = cartItems.slice();
    return newArr.splice(itemIndex, 1);
  }
  // Else decrement item quantity by 1
  return cartItems.map((item) => {
    return item.id === productToRemove.id ? { ...item, quantity: item.quantity - 1 } : item;
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, next) => acc + next.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
