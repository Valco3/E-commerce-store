// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "../lib/axios";
// import { useUserStore } from "../stores/useUserStore";
// import { useState } from "react";
// const PurchaseCancelPage = () => {
//   // const[error, setError] = useState(null)
//   const [isProcessing, setIsProcessing] = useState(true);
//   // const {clearCart} = useCartStore()
//   const { user } = useUserStore();

//   useEffect(() => {
//     if (!user) return;
//     const handleCheckoutFail = async (sessionId) => {
//       try {
//         const res = await axios.post("/payments/checkout-fail", {
//           sessionId,
//           user,
//         });
//         console.log("Checkout fail", res);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsProcessing(false);
//       }
//     };

//     const sessionId = new URLSearchParams(window.location.search).get(
//       "session_id"
//     );
//     if (sessionId) {
//       handleCheckoutFail(sessionId);
//     } else {
//       setIsProcessing(false);
//       // setError("No session ID found in the URL");
//     }
//   }, [user]);

//   if (isProcessing) {
//     return <div>Processing...</div>;
//   }

//   return (
//     <div>
//       <h1>Покупката Ви е отказана</h1>
//       <Link to="/">Начална страница</Link>
//     </div>
//   );
// };

// export default PurchaseCancelPage;
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-blue-600">Processing...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
