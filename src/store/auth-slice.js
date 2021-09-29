import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {idToken: null,isLoggedIn: false},
  reducers: {
    login: (state,action)=>{
      state.idToken = action.payload
      state.isLoggedIn = true
    },
    logout: (state)=>{
      state.idToken = null;
      state.isLoggedIn =false
    }
  }
})

export const authActions = authSlice.actions;
export default authSlice;