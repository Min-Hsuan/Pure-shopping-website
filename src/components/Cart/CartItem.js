import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice'
import classes from './CartItem.module.css'

const CartItem = (props) => {
  const dispatch = useDispatch()
  const { id, name, url, amount, price } = props

  const transformedPrice = price.toFixed(2)

  const subtractHandler = () => {
    dispatch(cartActions.removeItem(id))
  }

  const addHandler = () => {
    const enteredItem = {
      id,
      name,
      amount,
      price,
    }
    dispatch(cartActions.addItem(enteredItem))
  }

  return (
    <li className={classes['cart-item']}>
      <div className={classes.picture}>
        <img src={url} alt={name} />
      </div>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.action}>
        <button onClick={subtractHandler}>-</button>
        <span className={classes.amount}>{amount}</span>
        <button onClick={addHandler}>+</button>
      </div>
      <div className={classes.price}>{`${transformedPrice}$`}</div>
    </li>
  )
}

export default CartItem
