"use client";

import { useEffect, useState } from "react";
import CheckOutPage from "../../components/CheckOutPage";
import convertTosubCurrency from "../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Address from '../../components/Address';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const amount = 49;

export default function Payment() {
  const [addressValid, setAddressValid] = useState(false);
  const [touched,setTouched] = useState(false)

  
  return (
    <div className="h-[100vh] w-full flex justify-center items-center flex-col gap-5 ">
      <Address onDataChange={setAddressValid} onTouched = {setTouched}/>

      {addressValid && touched  &&  (
        <div className="bg-white w-[25rem] flex justify-center items-center flex-col p-5 rounded-2xl">
          <div className="text-black text-lg">Amount To Pay: &#58; {amount}</div>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertTosubCurrency(amount),
              currency: "usd",
            }}
          >
            <CheckOutPage amount={amount} />
          </Elements>
        </div>
      )}
    </div>
  );
}
