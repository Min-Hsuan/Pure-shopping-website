import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice.js'
import classes from './CartItem.module.css'
import React, { useCallback } from 'react'

const CartItem = React.memo(({ id, name, url, amount, price }) => {
  const dispatch = useDispatch()

  const transformedPrice = price.toFixed(2)

  const subtractHandler = useCallback(() => {
    dispatch(cartActions.removeItem(id))
  },[dispatch, id])

  const addHandler = useCallback(() => {
    const enteredItem = {
      id,
      name,
      amount,
      price,
    }
    dispatch(cartActions.addItem(enteredItem))
  },[dispatch, id, name, amount, price])

  return (
    <li className={classes['cart-item']}>
      <div className={classes.picture}>
        <img loading="lazy" src={url} alt={name} />
      </div>
      <div className={classes.name}>{name}</div>
      <div className={classes.action}>
        <button onClick={subtractHandler}>-</button>
        <span className={classes.amount}>{amount}</span>
        <button onClick={addHandler}>+</button>
      </div>
      <div className={classes.price}>{`${transformedPrice}$`}</div>
    </li>
  )
})

export default CartItem
