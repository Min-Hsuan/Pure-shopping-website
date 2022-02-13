import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { authActions } from '../../store/auth-slice'
import { cartActions } from '../../store/cart-slice'
import { uiActions } from '../../store/ui-slice'
import Notification from '../UI/Notification'
import classes from './MainNavigation.module.css'

const MainNavigation = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.idToken)
  const cartQuantity = useSelector((state) => state.cart.totalQuantity)
  const successMessage = useSelector((state) => state.ui.notification.message)

  const logoutHandler = () => {
    dispatch(authActions.logout())
    dispatch(cartActions.clearCart())
    localStorage.removeItem('userIdToken')
    localStorage.removeItem('userExpiration')
    setTimeout(() => {
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: '',
          message: 'Log out successfully.',
        })
      )
    }, 300)
    setTimeout(() => {
      dispatch(uiActions.resetNotification())
    }, 2000)
    history.push('/')
  }

  const cartOpenHandler = () => {
    dispatch(uiActions.toggleCartDetail())
  }

  return (
    <React.Fragment>
      {successMessage !== '' && <Notification message={successMessage} />}
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>
            <Logo />
          </div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
            <li>
              <button onClick={cartOpenHandler}>
                <span className={classes.text}>Your Cart</span>
                <span className={classes.sum}>{cartQuantity}</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  )
}

export default MainNavigation
