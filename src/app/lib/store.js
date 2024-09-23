import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"
import paymentSlice from "./paymentSlice"

export const makeStore = ()=>{
    return configureStore({
        reducer:{
            productSlice,
            cartSlice,
            paymentSlice,
        }
    })
}