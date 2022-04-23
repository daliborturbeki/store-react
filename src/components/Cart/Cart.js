import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items);
  return (
    <Modal onClose={props.close}>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          
          {cartItems.map(item => 
          <CartItem 
              item={{
                key: item._id,
                _id: item._id,
                title: item.title, 
                quantity: item.quantity, 
                totalPrice: item.totalPrice,
                price: item.price
              }}
          />)}
        </ul>
      </Card>
    </ Modal>
  );
};

export default Cart;
