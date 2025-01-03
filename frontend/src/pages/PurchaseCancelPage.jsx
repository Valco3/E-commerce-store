import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";

const PurchaseCancelPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;

    const handleCheckoutFail = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-fail", {
          sessionId,
          user,
        });
        console.log("Checkout fail");
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
      handleCheckoutFail(sessionId);
    } else {
      setIsProcessing(false);
    }
  }, [user]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
        <div
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center"
        >
          <h2 className="text-lg font-medium text-blue-600">Обработка...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Покупката Ви е отказана
        </h2>
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

export default PurchaseCancelPage;
