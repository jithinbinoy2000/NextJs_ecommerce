"use client"

import { useEffect, useState } from "react";
import convertTosubCurrency from "../lib/convertToSubcurrency";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

 const CheckOutPage =({amount})=>{
    const stripe = useStripe();
    const elements = useElements()
    const [errorMessage,setErrorMessage] = useState(null);
    const [clientSecret,setClientSecret] = useState("");
    const [loading,setLoading] = useState(false)
useEffect(()=>{
    fetch('/api/create-payment-intent',
        {
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({amount:convertTosubCurrency(amount)})
        }).then((res=>res.json())).then((data)=>setClientSecret(data.clientSecret))

},[amount])

const handleSubmit =async(event)=>{
event.preventDefault();
setLoading(true);

if(!stripe || !elements){
    return;

}

const {error }= await elements.submit();
if(error){
    setLoading(false);
    setErrorMessage(error.message)
    return
}
 //confirm payment
const confirmError = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams:{
        return_url:"http://localhost:3000/Cart"
    }
})
console.log("confirm",confirmError);
if(confirmError){
    setLoading(false)
    console.log("no errrejhfe");
    
}
else{
    setLoading(false)
    console.log("no errrejhfecdcdscsdcsdcsdcdcsdcsdcsdcsdcsdcsdcsdc ");
}
if(!clientSecret || !stripe ||!elements){
    return(
        <div className=" flex justify-center items-center">Loading ....</div>
    )
}

}

return(
    <form onSubmit={handleSubmit} className="bg-grey-100 p-5 rounded-lg flex flex-col justify-center items-center">
        {clientSecret && <PaymentElement/>}
        {errorMessage &&  <div style={{color:"red"}}>{errorMessage}</div>}

        <button
        
        className="border text-white border-transparent  bg-black rounded-lg p-2 w-40 text-xl font-bold mt-3 hover:cursor-pointer">
        {!loading?`Pay ${amount}`:"Processing..."}
            </button>
    </form>
)
 }
 export default CheckOutPage;