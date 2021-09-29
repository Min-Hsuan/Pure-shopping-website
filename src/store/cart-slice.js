import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  isChanged: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state,action)=>{
      state.isChanged = true;
      const existingItem = state.items.find(item=>item.id === action.payload.id);
      if(existingItem){
        existingItem.amount++;
      }else{
        state.items.push(action.payload)
      }
      state.totalQuantity++
      state.totalAmount= state.totalAmount + action.payload.price;
    },
    removeItem: (state,action)=>{
      state.isChanged = true;
      const existingItem = state.items.find(item=> item.id === action.payload)
      if(existingItem.amount === 1){
        state.items = state.items.filter(item=> item.id !== existingItem.id)
      }else{
        existingItem.amount--;
      }
      state.totalQuantity--;
      state.totalAmount = state.totalAmount - existingItem.price;
    },
    replaceCart: (state, action)=>{
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.totalQuantity = action.payload.totalQuantity;

    },
    clearCart: ()=>{
      return initialState;
    }
  }
})
export const cartActions = cartSlice.actions;
export default cartSlice;