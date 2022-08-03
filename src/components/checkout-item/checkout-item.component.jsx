import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;

  const { removeItemFromCart } = useContext(CartContext);

  const removeItem = () => removeItemFromCart(item)
  
  return (
    <div className="checkout-item-container">
        <img src={imageUrl} alt={name} />
        <span>{name}</span>
        <span>{'< '}{quantity}{' >'}</span>
        <span>{price}</span>
        <span className='remove' onClick={removeItem}>X</span>
    </div>
  );
};

export default CheckoutItem;
