import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchAuthData } from '../../store/auth-https';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './AuthForm.module.css';

const AuthForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(props.message);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlSwWv8WcQ4MFE-NwrWjJIVKqp-Vz412g';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlSwWv8WcQ4MFE-NwrWjJIVKqp-Vz412g';
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
    );

    //if error occurred ,then show error
    if (props.status !== 'success') {
      setErrorMessage(props.message);
      return;
    } else {
      history.push('/');
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };
  
  let submitText = 'Create Account';
  if (isLogin) {
    submitText = 'LOGIN';
  }
  if (props.status === 'pending') {
    submitText = <LoadingSpinner />;
  }

  const emailChangeHandler = () => {
    setErrorMessage(null);
  };
  const passwordChangeHandler = () => {
    setErrorMessage(null);
  };
  return (
    <div className={classes['auth-bgc']}>
      <section className={classes.auth} onSubmit={submitHandler}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form>
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
          {props.status === 'error' && (
            <span className={classes.warning}>{errorMessage}</span>
          )}
          <button className={classes.toggle}>{submitText}</button>
        </form>
        <div className={classes.action}>
          <a href="/">Forgot your password ? </a>
          <button className={classes.creat} onClick={switchAuthModeHandler}>
            {' '}
            {isLogin ? 'Create an account' : 'Login with existing account'}{' '}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;
