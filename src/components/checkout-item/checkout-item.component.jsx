import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Value,
  Button,
  RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;
  const { removeItemFromCart, decrementItemFromCart, addItemToCart } = useContext(CartContext);

  const decrementItemHandler = () => decrementItemFromCart(item);
  const addItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => removeItemFromCart(item);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Button onClick={decrementItemHandler}>
          &#10094;
        </Button>
        <Value>{quantity}</Value>
        <Button onClick={addItemHandler}>
          &#10095;
        </Button>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
