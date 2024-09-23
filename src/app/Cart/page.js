"use client";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addToCart, decrementCart } from "../lib/cartSlice";
import {setPaymentAmount} from '../lib/paymentSlice'
export default function Cart() {
  const [cartItem, setCartItems] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    router.back();
  };

  const { products } = useSelector((state) => state.productSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  

  useEffect(() => {
    if (cart.length > 0 && products.length > 0) {
      const filteredItems = products.filter((product) =>
        cart.some((cartItem) => cartItem.id === product.id)
      );
      setCartItems(filteredItems);
    }
  }, [cart, products]);

  const handleIncrement = (id) => {
    dispatch(addToCart(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementCart(id));
  };

  // Calculate total price
  const totalPrice = cartItem
    .reduce((total, item) => {
      const cartItem = cart.find((p) => p.id === item.id);
      const quantity = cartItem ? cartItem.quantity : 0; 
      return total + quantity * item.price;
    }, 0);
  const handleCheckout = () => {
    dispatch(setPaymentAmount(totalPrice))
    router.push("/Cart/Payment");
  };

  

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="flex justify-around p-2 w-full">
        <div className="w-full text-center text-lg font-semibold underline">
          My Cart
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer me-2 hover:text-red-500"
        >
          X
        </div>
      </div>
      <div className="cart-container">
        {cart.length > 0 ? (
          cartItem.length > 0 ? (
            cartItem.map((item) => (
              <div
                key={item.id}
                className="cart-item mb-2 rounded-md bg-black px-5 p-5 flex gap-10 justify-between items-center flex-wrap"
              >
                <div className="bg-[#ffffff] rounded-md hover:border-2 border-blue-600">
                  <img
                    src={item.images[0]}
                    width={150}
                    height={100}
                    alt="product"
                    className="p-3 border border-white rounded-md"
                  />
                </div>
                <div>
                  <div className="text-wrap">{item.title}</div>
                  <div>
                    ${" "}
                    {Math.floor(
                      cart.find((p) => p.id === item.id).quantity *
                        item.price *
                        100
                    ) / 100}
                  </div>
                </div>
                <div className="flex gap-2 border-[#171717] border-2 max-w-[8rem] min-w-[6rem] p-1 justify-evenly rounded-3xl hover:cursor-pointer ">
                  <div
                    className="text-xl cursor-pointer"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </div>
                  {cart.find((p) => p.id === item.id).quantity}
                  <div
                    className="text-xl"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading Cart Items...</div>
          )
        ) : (
          <div className="w-full h-[50vh] flex flex-col items-center justify-center">
            <Image
              src="/images/trolley.png"
              width={50}
              height={100}
              alt="Cart"
            />
            <div className="text-wrap text-lg font-semibold">
              Your cart is empty
            </div>
            <div
              className="p-2 border border-white rounded hover:bg-black cursor-pointer"
              onClick={() => router.back()}
            >
              Explore Collections
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {/* Total Price Display */}
          {cart.length > 0 && (
            <div className="mt-4 text-lg font-semibold">
              Total Price: $ {totalPrice}
            </div>
          )}

          {/* Checkout Button */}
          {cart.length > 0 && (
            <div
              className="border border-transparent text-center  rounded-md mt-2 cursor-pointer p-3 bg-[#2159d4]"
              onClick={handleCheckout}
            >
              Proceed To Checkout
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
