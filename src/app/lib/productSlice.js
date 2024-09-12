import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await axios.get('https://dummyjson.com/c/99dd-7777-413c-95b8');
    
        return response.data;
     
        
    } catch (error) {
        return Promise.reject(error.message || 'Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        loading: false,
        error: '',
        selectedProduct: null
    },
    reducers: {
        findSelectedProduct: (state, action) => {
            const selectedProduct = state.products.find(product => product.id === action.payload);
            state.selectedProduct = selectedProduct || null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('Fetched Products:', action.payload); 
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.error.message;
            });
    }
});

export const { findSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
