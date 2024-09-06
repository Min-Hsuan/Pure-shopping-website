import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Cart from '../Cart/Cart.jsx';
import Footer from './Footer.jsx';
import MainNavigation from './MainNavigation.jsx';

const Layout = (props) => {
  const cartIsOpened = useSelector((state) => state.ui.cartIsOpened);
  return (
    <Fragment>
      {cartIsOpened && <Cart />}
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
