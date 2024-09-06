import { useDispatch, useSelector } from 'react-redux';

import { RiCloseFill } from 'react-icons/ri';
import { uiActions } from './../../store/ui-slice.js';
import Modal from '../UI/Modal.jsx';
import CartItem from './CartItem.jsx';

import classes from './Cart.module.css';

const Cart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const transformedTotal = totalAmount.toFixed(2);
  const cartSum = items.reduce((total, item) => total + item.amount, 0);

  const cartList = items.map((item) => (
    <CartItem
      key={item.id}
      url={item.url}
      name={item.name}
      amount={item.amount}
      price={item.price}
      id={item.id}
    />
  ));

  const toggleCartDetail = () => {
    dispatch(uiActions.toggleCartDetail());
  };
  return (
    <Modal className="modal" onClose={toggleCartDetail}>
      <div className={classes['cart-box']}>
        <div className={`flex-between ${classes.title}`}>
          <span className="title-mid">Your Cart</span>
          <span className={classes.sum}>{cartSum}</span>
        </div>
        <ul className={classes.list}>{cartList}</ul>
        <div className={classes.action}>
          <button className="alt-button" onClick={toggleCartDetail}>
            Continue shopping
          </button>
          <button className="button">{`ORDER—${transformedTotal}`}</button>
        </div>
      </div>
      <button onClick={toggleCartDetail} className={classes.close}>
        <RiCloseFill />
      </button>
    </Modal>
  );
};

export default Cart;
