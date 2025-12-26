import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { uiActions } from '../../store/ui-slice.js'
import { fetchAuthData } from '../../store/auth-https.js'
import LoadingSpinner from '../UI/LoadingSpinner.jsx'
import classes from './AuthForm.module.css'
import GoogleLoginBtn from './GoogleLoginBtn.jsx'

const AuthForm = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [errorMsg, setErrorMsg] = useState(null)
  const [mode, setMode] = useState(props.mode) // switch between singup & login
  const notifyStatus = useSelector((state) => state.ui.notification.status)
  const notifyMessage = useSelector((state) => state.ui.notification.message)
  
  const submitHandler = (event) => {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    dispatch(fetchAuthData(email,password, mode))
    if (notifyStatus === 'success') {
      navigate('/')
    }
  }

  const switchAuthModeHandler = () => {
    setMode((prev) => prev === 'login'? 'signup' : 'login')
    emailRef.current.value = ''
    passwordRef.current.value = ''
    setErrorMsg(null)
    navigate(mode === 'login'? '/signup' : '/login')
    dispatch(
      uiActions.resetNotification()
    )
  }
  let submitText = 'Create Account'
  if (mode==='login') {
    submitText = 'LOGIN'
  }
  if (notifyStatus === 'pending') {
    submitText = <LoadingSpinner />
  }

  const emailChangeHandler = () => {
    dispatch(
      uiActions.resetNotification()
    )
  }
  const passwordChangeHandler = () => {
    dispatch(
      uiActions.resetNotification()
    )
  }
  return (
    <div className={classes['auth-bgc']}>
      <section className={classes.auth}>
        <h1>{ mode==='login' ? 'Login' : 'Sign Up'}</h1>
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
            {mode==='login' ? 'Create an account' : 'Login with existing account'}{' '}
          </button>
          <span>or</span>
         <GoogleLoginBtn />
        </div>
      </section>
    </div>
  )
}

export default AuthForm
