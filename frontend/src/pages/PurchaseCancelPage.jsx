import { Link } from "react-router-dom"
import { useEffect } from "react"
import axios from "../lib/axios"
import { useUserStore } from "../stores/useUserStore"
import { useState } from "react"
const PurchaseCancelPage = () => {
  // const[error, setError] = useState(null)
  const[isProcessing, setIsProcessing] = useState(true)
  // const {clearCart} = useCartStore()
  const {user} = useUserStore()

  useEffect(() => {
    if(!user) return
    const handleCheckoutFail = async (sessionId) => {
  try {
    await axios.post("/payments/checkout-fail", {
      sessionId, user
    });
            console.log("Checkout fail")

  } catch (error) {
    console.log(error);
  }  finally {
    setIsProcessing(false);
  }
};
  
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  if (sessionId) {
    handleCheckoutFail(sessionId);
  } else {
    setIsProcessing(false);
    // setError("No session ID found in the URL");
  }

}, [ user]);

if (isProcessing) {
  return <div>Processing...</div>;
}

  return (
    <div>
        <h1>Покупката Ви е отказана</h1>
        <Link to="/">
            Начална страница
        </Link>
    </div>
  )
}

export default PurchaseCancelPage