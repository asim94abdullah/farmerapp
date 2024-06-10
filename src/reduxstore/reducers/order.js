import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'orderData',
    initialState: {
      orderData: [],
    },
    reducers: {
      saveOrderData: (state, action) => {
       state.orderData = action.payload;
      },
    },
    
  })
  
  export const { saveOrderData } = orderSlice.actions
  
  export default orderSlice.reducer