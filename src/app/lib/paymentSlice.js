import {createSlice} from '@reduxjs/toolkit'
const paymentSlice = createSlice({
name:'paymentSlice',
initialState:{
    amount:0
},
reducers:{
    setPaymentAmount:(state,action)=>{
        state.amount= action.payload
    }
}
})
export const {setPaymentAmount} = paymentSlice.actions;
export  default paymentSlice.reducer;
