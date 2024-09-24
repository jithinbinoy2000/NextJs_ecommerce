import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import paymentSlice from "./paymentSlice";
import wishlistSlice from "./wishlistSlice"; // Ensure correct import

export const makeStore = () => {
    return configureStore({
        reducer: {
            productSlice,
            cartSlice,
            paymentSlice,
            wishlist: wishlistSlice, // Ensure naming consistency
        },
    });
};
