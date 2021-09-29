import { useDispatch} from 'react-redux';

import { RiCloseFill } from 'react-icons/ri';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import classes from './ProductDetail.module.css';

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const { id, name, url, price } = props.clickItem;
  const {status,onClose} = props;
  const transformedPrice = price.toFixed(2);

  let buttonText = `ADD TO CART — ${price}$`;
  if (status === 'pending') {
    buttonText = <LoadingSpinner />;
  }
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        price,
        amount: 1,
        url,
      })
    );
    if(status === 'success'){
      dispatch(uiActions.toggleCartDetail());
    }
  };
  
  const closeModalHandler = () => {
    onClose();
  };

  return (
    <Modal className="fixed-center" onClose={onClose}>
      <div className={classes.detail}>
        <img src={url} alt={name} />
        <div className={classes.content}>
          <div>
            <h3 className={classes.name}>{name}</h3>
            <span>{`—${transformedPrice}$`}</span>
          </div>
          <button className="button" onClick={addToCartHandler}>
            {buttonText}
          </button>
        </div>
      </div>
      <button onClick={closeModalHandler} className={classes.close}>
        <RiCloseFill />
      </button>
    </Modal>
  );
};

export default ProductDetail;
