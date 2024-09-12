"use client"
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('allProducts/fetchProducts', async () => {
    try {
        const response = await axios.get('https://dummyjson.com/c/99dd-7777-413c-95b8')
        return response.data;
        
        
    } catch (error) {
        return error;
    }
});

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            
            
            state.products = action.payload; // Adjust based on actual API response
            state.loading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message; // Use action.error.message
        });
    }
});

export default productSlice.reducer;
