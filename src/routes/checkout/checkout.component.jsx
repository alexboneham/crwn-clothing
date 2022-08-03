import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="checkout-container">

      <div className="header">
        <div className='details'>
          <span>Product</span>
          <span>Description</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Remove</span>
        </div>
        <hr />
      </div>

      <div className='items-container'>
        {cartItems.map((item) => (
          <div key={item.id}>
            <CheckoutItem item={item} />  
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
