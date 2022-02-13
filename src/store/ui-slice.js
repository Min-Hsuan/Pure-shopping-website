import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    cartIsOpened: false,
    notification: { status: '', title: '', message: '' },
  },
  reducers: {
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
    },
    toggleCartDetail: (state) => {
      state.cartIsOpened = !state.cartIsOpened
    },
    resetNotification: (state) => {
      state.notification = { status: '', title: '', message: '' }
    },
  },
})
export const uiActions = uiSlice.actions
export default uiSlice
