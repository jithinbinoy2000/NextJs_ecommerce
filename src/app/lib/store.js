import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./productSlice"

export const makeStore = ()=>{
    return configureStore({
        reducer:{
            productSlice
        }
    })
}