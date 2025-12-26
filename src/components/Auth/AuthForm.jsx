import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { uiActions } from '../../store/ui-slice.js'
import { fetchAuthData } from '../../store/auth-https.js'
import LoadingSpinner from '../UI/LoadingSpinner.jsx'
import classes from './AuthForm.module.css'
import GoogleLoginBtn from './GoogleLoginBtn.jsx'

const AuthForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isLogin, setIsLogin] = useState(true)
  const notifyStatus = useSelector((state) => state.ui.notification.status)
  const notifyMessage = useSelector((state) => state.ui.notification.message)

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value
    let url
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlSwWv8WcQ4MFE-NwrWjJIVKqp-Vz412g'
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlSwWv8WcQ4MFE-NwrWjJIVKqp-Vz412g'
    }
    dispatch(
      fetchAuthData(
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        url
      )
    )
    if (notifyStatus === 'success') {
      navigate('/')
    }
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev)
    emailRef.current.value = ''
    passwordRef.current.value = ''
    dispatch(
      uiActions.showNotification({
        status: '',
        title: '',
        message: '',
      })
    )
  }
  let submitText = 'Create Account'
  if (isLogin) {
    submitText = 'LOGIN'
  }
  if (notifyStatus === 'pending') {
    submitText = <LoadingSpinner />
  }

  const emailChangeHandler = () => {
    dispatch(
      uiActions.showNotification({
        status: '',
        title: '',
        message: '',
      })
    )
  }
  const passwordChangeHandler = () => {
    dispatch(
      uiActions.showNotification({
        status: '',
        title: '',
        message: '',
      })
    )
  }
  return (
    <div className={classes['auth-bgc']}>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              required
              onChange={emailChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              required
              onChange={passwordChangeHandler}
            />
          </div>
          {notifyStatus === 'error' && (
            <span className={classes.warning}>{notifyMessage}</span>
          )}
          <button className={classes.toggle}>{submitText}</button>
        </form>
        <div className={classes.action}>
          <Link to="/reset-password">Forgot your password ? </Link>
          <button className={classes.creat} onClick={switchAuthModeHandler}>
            {' '}
            {isLogin ? 'Create an account' : 'Login with existing account'}{' '}
          </button>
          <span>or</span>
         <GoogleLoginBtn />
        </div>
      </section>
    </div>
  )
}

export default AuthForm
