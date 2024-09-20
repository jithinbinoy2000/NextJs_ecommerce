"use client";

import CheckOutPage from "@/app/components/CheckOutPage";
import convertTosubCurrency from "@/app/lib/convertToSubcurrency";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Address from '../../components/Address'
// const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("pNEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
console.log(stripePromise);
const amount = 49;

export default function Payment() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center flex-col gap-5 ">
       <Address/>
      <div className="bg-white w-[25rem] flex justify-center items-center flex-col p-5 rounded-2xl">
        <div className="text-black text-lg">Amount To Pay &#58; {amount}</div>
        <Elements
          stripe={stripePromise}
            options={{
            mode: "payment",
            amount: convertTosubCurrency(amount), // covert into subcurrency means
            currency: "usd",
          }}
        >
          <CheckOutPage amount={amount} />
        </Elements>
      </div>
    </div>
  );
}
