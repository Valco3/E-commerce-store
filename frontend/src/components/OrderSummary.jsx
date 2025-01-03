import { useCartStore } from "../stores/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const stripePromise = loadStripe(
  "pk_test_51QMXjEAh9iV0onSy72M3hH5OkiXMAtRPgOfkfyY7GaqQYrAyXFVRBCRkIK3ZqXjAbloGJD7NzPdD3jed1MCkhivt00X0QJhRvK"
);

const OrderSummary = () => {
  const { total, cart } = useCartStore();
  const { user } = useUserStore();
  const formattedTotal = total.toFixed(2);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripePayment = async () => {
    setIsProcessing(true); 
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        user: user,
      });
      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setIsProcessing(false); 
    }
  };

  return (
    <div className="space-y-4 rounded-lg bg-gray-50 p-4 border sm:p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-900">Обща стойност</p>

      <div className="flex justify-between text-base font-semibold text-gray-900">
        <p>{formattedTotal}лв</p>
      </div>
      <button
        className={`w-full rounded-md px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
          isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"
        }`}
        onClick={handleStripePayment}
        disabled={isProcessing} 
      >
        {isProcessing ? "Обработка..." : "Направи поръчка"}
      </button>
    </div>
  );
};

export default OrderSummary;
