import classes from './ProductItem.module.css';

import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { _id, title, description, price, image} = props;

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      _id, title, price, description
    }))
  }

  return (
    <div className={classes['product-card']}>
		<div className={classes['badge']}>Hot</div>
		<div className={classes['product-tumb']}>
			<img src={image} alt="" />
		</div>
		<div className={classes['product-details']}>
			{/*<span class="product-catagory">{title}</span>*/}
			<h4>{title}</h4>
			<p>{description}</p>
			<div className={classes['product-bottom-details']}>
				<div className={classes['product-price']}>{price.toFixed(2)}kn</div>
				<div className={classes['product-links']}>
					{/*<a href=""><i class={classes['fa fa-heart']}></i></a>*/}
          <button onClick={addToCartHandler}>
             Add to cart
          </button>
				</div>
			</div>
		</div>
	</div>
  );
};

export default ProductItem;


/*
				<div class={classes['product-price']}><small>{1 + price.toFixed(2)}</small>{price.toFixed(2)}</div>

 <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
*/