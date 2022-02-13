import classes from './ResetForm.module.css'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchResetAuth } from '../../store/auth-https'
import LoadingSpinner from '../UI/LoadingSpinner'
const ResetForm = () => {
  const emailRef = useRef()
  const dispatch = useDispatch()
  const notifyStatus = useSelector((state) => state.ui.notification.status)
  const notifyMessage = useSelector((state) => state.ui.notification.message)
  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailRef.current.value
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlSwWv8WcQ4MFE-NwrWjJIVKqp-Vz412g'
    dispatch(
      fetchResetAuth(
        {
          requestType: 'PASSWORD_RESET',
          email: enteredEmail,
        },
        url
      )
    )
  }
  let submitText = 'SEND'
  if (notifyStatus === 'pending') {
    submitText = <LoadingSpinner />
  }

  return (
    <div className={classes['reset-bgc']}>
      <section className={classes.reset}>
        <h1>Forgot Your Password ?</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required ref={emailRef}></input>
          </div>
          {notifyStatus === 'error' && (
            <span className={classes.warning}>{notifyMessage}</span>
          )}
          <button className={classes.action}>{submitText}</button>
          <Link to="/login" className={classes.back}>
            Back to login page
          </Link>
        </form>
      </section>
    </div>
  )
}
export default ResetForm
