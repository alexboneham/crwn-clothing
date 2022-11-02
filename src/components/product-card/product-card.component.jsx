import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector.js';
import { addItemToCart } from '../../store/cart/cart.action.js';

import { ProductCardContainer, Footer, Name, Price } from './product-card.styles.jsx';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
