import React from "react";
import Products from '../components/Shop/Products';

const HomePage = (props) => {
  return <React.Fragment>
    <Products products={props.products}/>

  </React.Fragment>
};

export default HomePage;
