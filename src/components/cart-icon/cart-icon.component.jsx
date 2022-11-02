import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartContext } from '../../contexts/cart.context';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();

  const { cartCount } = useContext(CartContext);

  const isCartOpen = useSelector(selectIsCartOpen)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
