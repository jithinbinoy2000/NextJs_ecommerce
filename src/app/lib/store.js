import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"

export const makeStore = ()=>{
    return configureStore({
        reducer:{
            productSlice,
            cartSlice
        }
    })
}