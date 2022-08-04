import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;
  const { removeItemFromCart, decrementItemFromCart, addItemToCart } = useContext(CartContext);

  const decrementItemHandler = () => decrementItemFromCart(item);
  const addItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => removeItemFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <button className="arrow" onClick={decrementItemHandler}>
          &#10094;
        </button>
        <span className="value">{quantity}</span>
        <button className="arrow" onClick={addItemHandler}>
          &#10095;
        </button>
      </div>
      <span className="price">{price}</span>
      <button className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </button>
    </div>
  );
};

export default CheckoutItem;
