import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { removeCartItem, removeSingleItemFromCart, addCartItem } from '../../store/cart/cart.helpers';
import { setCartItems } from '../../store/cart/cart.action';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Value,
  BaseButton,
  RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const decrementItemHandler = () => dispatch(setCartItems(removeSingleItemFromCart(cartItems, item)));
  const addItemHandler = () => dispatch(setCartItems(addCartItem(cartItems, item)));
  const removeItemHandler = () => dispatch(setCartItems(removeCartItem(cartItems, item)));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <BaseButton onClick={decrementItemHandler}>&#10094;</BaseButton>
        <Value>{quantity}</Value>
        <BaseButton onClick={addItemHandler}>&#10095;</BaseButton>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
