import { cartActions } from './cart-slice.js'
import { uiActions } from './ui-slice.js'

const FIREBASE_DOMIN = 'https://react-http-fc644-default-rtdb.firebaseio.com'

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    )
    const storedUserId = localStorage.getItem('userIdToken')
    try {
      const response = await fetch(
        `${FIREBASE_DOMIN}/pureCart/${storedUserId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalAmount: cart.totalAmount,
            totalQuantity: cart.totalQuantity,
          }),
        }
      )
      if (!response.ok) {
        throw new Error('Send data failed!')
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Modify cart itmes successfully',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Modify cart itmes failed',
        })
      )
    }
  }
}

export const fetchCartData = (userIdToken) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Getting data...',
        message: 'Getting cart data.',
      })
    )
    try {
      const response = await fetch(
        `${FIREBASE_DOMIN}/pureCart/${userIdToken}.json`
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error('Fetch data failed')
      }
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalAmount: data.totalAmount,
          totalQuantity: data.totalQuantity,
        })
      )
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Getting cart data successfully.',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Getting data failed.',
        })
      )
    }
  }
}
