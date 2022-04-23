import { Route, Routes, Navigate } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useContext } from 'react';
import Notification from './components/UI/Notification';
import AuthContext from './store/auth-context';
import { fetchCartData, sendCartData } from './store/cart-actions';
import { fetchProductsData } from './store/products-actions';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import UserProfile from './components/Auth/UserProfile';
import HomePage from './pages/HomePage';

let isInitial = true;

function App() {
  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();
  let showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchCartData(authCtx._id));
  }, [authCtx._id, dispatch]);
  
  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);



  return (
    <React.Fragment>
    <Layout>
      <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
           {!authCtx.isLoggedIn &&
            <Route path='/auth' element={<AuthPage />}/>
           }
          {authCtx.isLoggedIn && <Route path='/profile' element={<UserProfile />} />}
          {!authCtx.isLoggedIn && <Route path='/auth' element={<AuthPage />}/>}

          <Route path="/home" element={[<HomePage products={products}/>, showCart && <Cart />]}/>
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
      
      {notification && <Notification 
        status={notification.status} title={notification.title} 
        message={notification.message}
      />}
    </Layout>
    </React.Fragment>
  );
}

export default App;
