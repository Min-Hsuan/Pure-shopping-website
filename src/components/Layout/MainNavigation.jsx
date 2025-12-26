import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import  Logo  from '../../assets/logo.svg'
import { uiActions } from '../../store/ui-slice.js'
import Notification from '../UI/Notification.jsx'
import classes from './MainNavigation.module.css'
import { logout} from '../../store/auth-https.js'

const MainNavigation = (props) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const cartQuantity = useSelector((state) => state.cart.totalQuantity)
  const successMessage = useSelector((state) => state.ui.notification.message)
  const notifyStatus = useSelector((state) => state.ui.notification.status)

  const logoutHandler = () => {
    dispatch(logout())
  }

  const cartOpenHandler = () => {
    dispatch(uiActions.toggleCartDetail())
  }

  return (
    <React.Fragment>
      {successMessage !== '' && <Notification message={successMessage} className={notifyStatus} />}
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>
            <img src={Logo} alt=""/>
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
