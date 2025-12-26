import { authActions } from './auth-slice.js'
import { uiActions } from './ui-slice.js'
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { auth } from '../firebase.js'
import { cartActions } from './cart-slice.js';

const AUTH_ERRORS = {
     // Registration Errors
    'auth/email-already-in-use': 'This email is already registered. Please log in instead.',
    'auth/invalid-email': 'The email address is not valid.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
    'auth/weak-password': 'The password is too weak. Please use at least 6 characters.',
    // Login Errors
    'auth/user-disabled': 'This user account has been disabled by an administrator.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    
    // New Unified Error (Firebase v10+)
    'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
    
    // General Errors
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.'
  };
export const fetchAuthData = (email, password, mode) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending data...',
        message: 'Connecting...',
      })
    )
    try {
      let userCrediential
      if(mode==='login'){
        userCrediential = await signInWithEmailAndPassword( auth, email, password)
          dispatch(uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sign in successfully'
          }))
      }else{
        userCrediential = await createUserWithEmailAndPassword(auth, email, password)
      }
      dispatch(authActions.login())
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Successfully login.',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: AUTH_ERRORS[error.code],
        })
      )
    }
  }
}

export const fetchResetAuth = (emailData, url) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending data...',
        message: 'Connecting...',
      })
    )
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) {
        let errorMessage = 'Send reset password email failed'
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message
        }
        throw new Error(errorMessage)
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Send successfully!',
          message: 'Please check your email to reset password',
        })
      )
      setTimeout(() => {
        dispatch(uiActions.resetNotification())
      }, 2000)
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: error.message,
        })
      )
    }
  }
}

export const retrieveStoredToken = () => {
  return (dispatch) => {
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        dispatch(authActions.login())
      }
    })
    return unsubscribe
  }
}
export const logout = ()=>{
  return async(dispatch)=> {
    try{
      await signOut(auth)
      dispatch(authActions.logout())
      dispatch(cartActions.clearCart())
      localStorage.removeItem('cart')
      setTimeout(() => {
        dispatch(
          uiActions.showNotification({
          status: 'success',
          title: 'Logout successfully!',
          message: 'Logout successfully. See you soon.',
          })
        )
      }, 300)
      setTimeout(() => {
        dispatch(uiActions.resetNotification())
      }, 2000)
    }catch(error){
      console.error('Logout Failed',error)
      uiActions.showNotification({
          status: 'error',
          title: 'Logout failed!',
          message: 'Something wrong, we will fix it soon.',
        })
    }
  }
}
