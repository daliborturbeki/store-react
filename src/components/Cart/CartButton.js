import styles from '../Layout/MainHeader.module.css';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={styles.header__option} onClick={toggleCartHandler}>
    <div className={styles.header__option}>
        <span className={styles.header__optionLineTwo}>{totalQuantity}</span>
        <ShoppingBasketIcon />
    </div>
      </button>
  );
};

export default CartButton;

/*

    <button className={classes.button} onClick={toggleCartHandler}>
      
<span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
      */