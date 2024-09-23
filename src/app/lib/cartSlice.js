const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [
            
        ],
    },
    reducers:{
        addToCart:(state,action)=>{
           const existingItem = state.cart.find((item)=>item.id === action.payload)
          
           
           if(!existingItem){
            let newCartItem =  {
                id:action.payload,
                quantity:1
            }
            state.cart.push(newCartItem);
           }else{
            existingItem.quantity++;
           }
        
        },
        removeFromCart:(state,action)=>{
            state.cart = state.cart.filter((item)=>item.id !== action.payload)
        },
        decrementCart:(state,action)=>{
            const existingItem = state.cart.find((item)=>item.id === action.payload)
            if(!existingItem){
                return null
            }else{
                if(existingItem.quantity==1){
                    state.cart = state.cart.filter((item)=>item.id !== action.payload)
                }else{
                    existingItem.quantity--;
                }
               
            }
        }
        
    }

});
    
export  const {addToCart,removeFromCart,decrementCart} = cartSlice.actions;
export default cartSlice.reducer;