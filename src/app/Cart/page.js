"use client"
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addToCart, decrementCart } from "../lib/cartSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Cart() {
    const [cartItem, setCartItems] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch()
    
    const handleClose = () => {
        router.back();
    };

    const { products } = useSelector((state) => state.productSlice);
    const { cart } = useSelector((state) => state.cartSlice);

    useEffect(() => {
        if (cart.length > 0 && products.length > 0) {
            const filteredItems = products.filter(product =>
                cart.some(cartItem => cartItem.id === product.id)
            );
            setCartItems(filteredItems);
        }
    }, [cart, products]);
    const handleIncrement = (id)=>{
    dispatch(addToCart(id))
    }
const handleDecrement=(id)=>{
dispatch(decrementCart(id))
}
    const handleDelete =()=>{
        console.log("delete");
    }
    

    return (
        <div className="flex flex-col justify-center items-center"> 
            <Header />
            <div className="cart-container ">
                <div className="flex justify-between p-2">
                    <div className="w-full text-center text-lg font-semibold underline">My Cart</div>
                    <div onClick={handleClose} className="cursor-pointer me-2 hover:text-red-500">X</div>
                </div>

                {cart.length > 0 ? (
                    cartItem.length > 0 ? (
                        cartItem.map((item) => (
                            <div key={item.id} className="cart-item  max-w-[30rem] bg-black px-5 p-5 flex gap-10 justify-center items-center flex-wrap">
                                <div className="bg-[#363636]"> <img src={item.images[0]} width={150} height={100} alt="product" className="p-3 border border-white rounded-md"/></div>
                               
                                
                                <div>
                                <div className="text-wrap">{item.title}</div>
                                <div> $ &nbsp; {Math.floor((cart.find(p=>p.id===item.id).quantity *  item.price)*100)/100}</div>

                                </div>
                                    
                                <div className="flex gap-2 border-[#171717] border-2 max-w-[8rem] min-w-[6rem]  p-1 justify-evenly rounded-3xl hover:cursor-pointer ">
                                    <div className="text-xl cursor-pointer"
                                    onClick={()=>handleDecrement(item.id)}>
                                        -
                                    </div>
                              {cart.find(p=>p.id===item.id).quantity}
                                    <div className="text-xl" onClick={()=>handleIncrement(item.id)}>+</div>
                                </div>
                            </div>
                        ) )
                        
                    ) : (
                        <div>Loading Cart Items...</div>
                    ) 
                ) : (
                    <div className="w-full h-[50vh] flex flex-col items-center justify-center"> 
                        <Image src='/images/trolley.png' width={50} height={100} alt="Cart"/>
                        <div className="text-wrap text-lg font-semibold">Your cart is empty</div>
                        <div className="p-2 border border-white rounded hover:bg-black cursor-pointer" onClick={()=>router.back()}>Explore Collections</div>
                    </div>
                )}
                {/*  */}
            </div>{
                cart.length>0 && 
                <div className=" border border-transparent  rounded-md mt-2 cursor-pointer p-3 bg-[#2159d4]">Proceed To CheckOut</div> 
            }
           
        </div>
    );
}
