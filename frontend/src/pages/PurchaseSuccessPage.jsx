import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCartStore();
  const { user } = useUserStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", {
          sessionId,
          user,
        });
        console.log("Checkout success");
        clearCart();
      } catch (error) {
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart, user]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-lg font-medium text-blue-600">Обработка...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-lg font-medium text-red-600">Error: {error}</h2>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium mt-4 block"
          >
            Възникна грешка. Върнете се на началната страница
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Вашата поръчка беше успешна!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Благодарим Ви за вашата покупка.
        </p>
        <Link
          to="/"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex justify-center items-center"
        >
          Начална страница
        </Link>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
