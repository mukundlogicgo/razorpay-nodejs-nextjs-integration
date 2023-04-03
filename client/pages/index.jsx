import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRazorpayResponse = async (response) => {
    console.dir(response);
    setIsLoading(true);
    toast.success("Payment successfully received.");
    setIsLoading(false);
  };

  const handlePayClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `http://localhost:5000/api/razorpay/order`
      );

      const { order_id, currency, amount } = data;

      const options = {
        key: "rzp_test_4uYtnpiq9wmRXS",
        currency,
        amount,
        order_id,
        handler: handleRazorpayResponse,
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      error?.response?.data?.message &&
        toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Head>
        <title>Check out page</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
      </Head>
      <button onClick={handlePayClick} disabled={isLoading}>
        {!isLoading ? "pay Rs. 499" : "Loading..."}
      </button>
      <ToastContainer
        closeButton={true}
        newestOnTop={true}
        pauseOnFocusLoss={false}
        autoClose={2500}
      />
    </>
  );
}
