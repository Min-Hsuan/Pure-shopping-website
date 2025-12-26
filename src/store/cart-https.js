import { cartActions } from './cart-slice.js'
import { uiActions } from './ui-slice.js'
import { onValue, ref, set } from 'firebase/database'
import {db , auth} from '../firebase.js'

const FIREBASE_DOMIN = import.meta.env.VITE_FIREBASE_DATABASE_URL

if(!FIREBASE_DOMIN){
  console.error('Firebase Database URL 未設定')
}
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    )
    const uid = auth.currentUser?.uid
    if(!uid) return
    try{
      console.log('uid',auth.currentUser)
      await set(ref(db, `carts/${uid}`),{
        items: cart.items,
        totalAmount: cart.totalAmount,
        totalQuantity: cart.totalQuantity,
      })
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Modify cart itmes successfully',
        })
      )
    }catch (error) {
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
    const uid = auth.currentUser?.uid
    if(!uid) return
    const cartRef = ref(db,`carts/${uid}`)
    onValue(cartRef, (snapshot)=>{
      const data = snapshot.val() || {}
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalAmount: data.totalAmount || 0,
          totalQuantity: data.totalQuantity || 0,
        })
      )
      dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Getting data successfully',
        message: 'Getting cart data successfully.',
      })
    )
    },(error)=>{
      console.log(error)
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Getting data failed.',
        })
      )
    })
    
  }
}
