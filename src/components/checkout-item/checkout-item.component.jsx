import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;

  const { removeItemFromCart, changeCartItemQuantity } = useContext(CartContext);

  const removeItem = () => removeItemFromCart(item);

  const changeQuantity = (e) => {
    const action = e.target.innerText === ' >' ? 'increment' : 'decrement'
    return changeCartItemQuantity(item, action);
  };

  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
      <span>
        <span className='quantity-symbol' onClick={changeQuantity} >{'< '}</span>
        {quantity}
        <span className='quantity-symbol' onClick={changeQuantity} >{' >'}</span>
      </span>
      <span>{price}</span>
      <span className="remove" onClick={removeItem}>
        X
      </span>
    </div>
  );
};

export default CheckoutItem;
