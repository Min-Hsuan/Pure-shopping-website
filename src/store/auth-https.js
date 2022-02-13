import { authActions } from './auth-slice'
import { uiActions } from './ui-slice'

export const fetchAuthData = (authData, url) => {
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
        body: JSON.stringify(authData),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (!response.ok) {
        let errorMessage = 'Authentication failed!'
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message
        }
        throw new Error(errorMessage)
      }
      dispatch(authActions.login(data.localId))
      localStorage.setItem('userIdToken', data.localId)
      const expirationTime = new Date(
        new Date().getTime() + data.expiresIn * 1000
      )
      localStorage.setItem('userExpiration', expirationTime)

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
          message: error.message,
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

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()
  const remainingDuration = adjExpirationTime - currentTime
  return remainingDuration
}

export const retrieveStoredToken = () => {
  return (dispatch) => {
    const storedToken = localStorage.getItem('userIdToken')
    const storedExpires = localStorage.getItem('userExpiration')
    const remainingTime = calculateRemainingTime(storedExpires)
    if (remainingTime <= 3600 && storedToken) {
      dispatch(authActions.logout())
      localStorage.removeItem('userIdToken')
      localStorage.removeItem('userExpiration')
      return null
    }
    if (storedToken) {
      dispatch(authActions.login(storedToken))
    }
  }
}
