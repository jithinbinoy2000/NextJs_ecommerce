import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        return response.data.products; // Ensure you return the products array
    } catch (error) {
        return Promise.reject(error.message || 'Failed to fetch products');
    }
});

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        products: [],
        productContainer: [],
        loading: false,
        error: '',
        selectedProduct: null
    },
    reducers: {
        findSelectedProduct: (state, action) => {
            const selectedProduct = state.products.find(product => product.id === action.payload);
            state.selectedProduct = selectedProduct || null;
        },
        productCategory: (state, action) => {
            switch (action.payload) {
                case "all":
                    state.products = state.productContainer;
                    break;
                default:
                    state.products = state.productContainer.filter(
                        (product) => product.category.toLowerCase() === action.payload.toLowerCase()
                    );
                    break;
            }
        },
        productSort: (state, action) => {
            switch (action.payload) {
                case "Default":
                    state.products = state.productContainer;
                    break;
                case "Low Price":
                    state.products.sort((a, b) => a.price - b.price);
                    break;
                case "High Price":
                    state.products.sort((a, b) => b.price - a.price);
                    break;
                case "High Rating":
                    state.products.sort((a, b) => b.rating - a.rating);
                    break;
                case "Low Rating":
                    state.products.sort((a, b) => a.rating - b.rating);
                    break;
                default:
                    state.products = state.productContainer;
                    break;
            }
        },
        productSearch: (state, action) => {
            state.products = state.productContainer.filter((item) =>
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.productContainer = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.error.message;
            });
    }
});

export const { findSelectedProduct, productCategory, productSort, productSearch } = productSlice.actions;
export default productSlice.reducer;
