    const { createSlice } = require("@reduxjs/toolkit");

    const wishlistSlice = createSlice({
        name: "wishlist",
        initialState: {
            wishlist: [], 
        },
        reducers: {
            addToWishlist: (state, action) => {
                const existingItem = state.wishlist.find((item) => item.id === action.payload);
                if (!existingItem) {
                    const newWishListItem = {
                        id: action.payload,
                        quantity: 1,
                    };
                    state.wishlist.push(newWishListItem);
                }
            },
            removeFromWishlist: (state, action) => {
                state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
            },
        },
    });

    export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
    export default wishlistSlice.reducer;
