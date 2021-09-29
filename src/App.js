import React ,{ useEffect,Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

import { fetchCartData, sendCartData } from './store/cart-https';
import { retrieveStoredToken } from './store/auth-https';
import {cartActions} from './store/cart-slice';

const AuthPage = React.lazy(()=>import('./pages/AuthPage'));
const Blog = React.lazy(()=>import('./pages/Blog'));
const HomePage = React.lazy(()=>import('./pages/HomePage'));
const ProductPage = React.lazy(()=>import('./pages/ProductPage'));

let initial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const idToken = useSelector((state) => state.auth.idToken);
  const notification = useSelector((state) => state.ui.notification);

  //check if user was login once page reload
  useEffect(() => {
    if (initial) {
      dispatch(retrieveStoredToken());
      initial = false;
    }
    
  }, [dispatch]);

  //get localStorage once page reload
  useEffect(()=>{
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if(storedCart){
      dispatch(cartActions.replaceCart({
        items: storedCart.items || [],
        totalAmount: storedCart.totalAmount,
        totalQuantity: storedCart.totalQuantity
      }))
    }

  },[dispatch])

  //post the latest cart data to firebase
  useEffect(() => {
    if (cart.isChanged) {
      dispatch(sendCartData(cart));
      localStorage.setItem('cart',JSON.stringify(cart))
    }

  }, [cart, dispatch]);

  //get firebase data when user is login
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartData(idToken));
    }
  }, [dispatch, isLoggedIn, idToken]);
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          {!isLoggedIn && (
            <Route path="/login" exact>
              <AuthPage
                status={notification.status}
                title={notification.title}
                message={notification.message}
              />
            </Route>
          )}
          <Route path="/" exact>
            <HomePage 
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          </Route>
          <Route path="/products" exact>
            <ProductPage 
            status={notification.status}
            title={notification.title}
            message={notification.message}
            />
          </Route>
          <Route path="/article/:articleId" exact>
            <Blog />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
