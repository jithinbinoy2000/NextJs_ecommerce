import {createSlice} from '@reduxjs/toolkit'
const paymentSlice = createSlice({
name:'paymentSlice',
initialState:{
    amount:0,
    email:'',
    address:[]
},
reducers:{
    setPaymentAmount:(state,action)=>{
        state.amount= action.payload
    },
    setAddress:(state,action)=>{
        state.address = action.payload
    },
    setEmail:(state,action)=>{
        state.email = action.payload
    }
}
})
export const {setPaymentAmount,setAddress,setEmail} = paymentSlice.actions;
export  default paymentSlice.reducer;
