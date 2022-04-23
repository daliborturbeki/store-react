import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <ul>
        {props.products.map(product => <ProductItem
          key={product._id}
          _id={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
        />)}
      </ul>
    </section>
  );
};

export default Products;
