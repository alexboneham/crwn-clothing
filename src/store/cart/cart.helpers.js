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

export const removeCartItem = (cartItems, productToRemove) => cartItems.filter((item) => item.id !== productToRemove.id);

export const removeSingleItemFromCart = (cartItems, productToChange) => {
  if (productToChange.quantity > 1) {
    return cartItems.map((item) => (item.id === productToChange.id ? { ...item, quantity: item.quantity - 1 } : item));
  }
  return removeCartItem(cartItems, productToChange);
};

