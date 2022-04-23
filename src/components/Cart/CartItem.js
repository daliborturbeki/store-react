import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { _id, title, description, quantity, totalPrice, price } = props.item;

  const dispatch = useDispatch()

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(_id))
  }

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart(
      {
        _id, title, price, description
      }
    ))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          {totalPrice.toFixed(2)}kn{' '}
          <span className={classes.itemprice}>({price.toFixed(2)}kn/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
