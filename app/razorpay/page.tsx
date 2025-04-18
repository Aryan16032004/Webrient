"use client";

import React,{useState} from "react";
import Script from "next/script";

declare global{
    interface Window{
        Razorpay:any;
    }
}

const PaymentPage = () => {
    const AMOUNT = 100;
    const [isProcessing, setIsProcessing] = useState(false);
    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const response =await fetch("/api/create-order", {method: "POST"})
            const data =await response.json();

            const options={
                key:process.env.RAZORPAY_KEY_ID,
                amount: AMOUNT*100,
                currency: "INR",
                name:"webrient",
                description:"Test Transaction",
                order_id:data.orderId,
                handler: function(response:any){
                    alert("Payment Successful!");
                    console.log(response);
                },
                prefill:{
                    name:"John Doe",
                    email:"john@example.com",
                    contact:"9999999999",
                },
                theme:{
                    color:"#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment failed:", error);
            setIsProcessing(false);
        }
        finally{
            setIsProcessing(false);
        }
    }


    return(
    <div>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
        <div>
            <h1>Payment Page</h1>
            <p>Amount to pay: {AMOUNT} INR</p>
            <button
            onClick={handlePayment}
            disabled={isProcessing}
            >
                {isProcessing?"Processing...":"Pay Now"}
            </button>
        </div>
    </div>
    )
}

export default PaymentPage;