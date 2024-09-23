import { useEffect, useState } from "react";
import convertTosubCurrency from "../lib/convertToSubcurrency";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

const CheckOutPage = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    const { cart } = useSelector((state) => state.cartSlice);
    const {address} = useSelector((state)=>state.paymentSlice);
    const {email} = useSelector((state)=>state.paymentSlice);
    

    const placeOrder = async () => {
        try {
            const response = await fetch('https://next-ecommerce-server-main.onrender.com/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Fixed typo
                },
                body: JSON.stringify({ email,cart,amount,address}),
            });
            const data = await response.json();
            // console.log(data);
        } catch (error) {
            // console.log("Error placing order:", error);
        }
    };

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertTosubCurrency(amount) }),
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret));
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await placeOrder(); 
    
        if (!stripe || !elements) {
            return;
        }
    
        const { error } = await elements.submit();
        if (error) {
            setLoading(false);
            setErrorMessage(error.message);
            return;
        }
    
        // Confirm payment
        const confirmError = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: "https://next-js-ecommerce-tau-six.vercel.app/Cart/Payment/SuccessPayment",
            },
          
        });
        if (confirmError) {
            setLoading(false);
            // console.log("Payment confirmation error:", confirmError);
        } else {
            await placeOrder(); 
            setLoading(false);
            // console.log("Payment successful");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="bg-grey-100 p-5 rounded-lg flex flex-col justify-center items-center ">
            {clientSecret && <PaymentElement />}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <button className="border text-white border-transparent bg-black rounded-lg p-2 w-40 text-xl font-bold mt-3 hover:cursor-pointer">
                {!loading ? `Pay ${amount}` : "Processing..."}
            </button>
        </form>
    );
};

export default CheckOutPage;
