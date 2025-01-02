import {Link} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../lib/axios"
import { useCartStore } from "../stores/useCartStore"
import {useUserStore} from "../stores/useUserStore"
const PurchaseSuccessPage = () => {
    //mail to user

    const[isProcessing, setIsProcessing] = useState(true)
    const[error, setError] = useState(null)
    const {clearCart} = useCartStore()
    const {user} = useUserStore()

    useEffect(() => {
        const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId, user
				});
                console.log("Checkout success")
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart, user]);

    if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;
  return (
    <div className="h-screen flex items-center justify-center px-4">


        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
            <div className="p-6 sm:p-8">
                <h1 className="text-2xl font-bold text-gray-100">
                    Вашата поръчка беше успешна
                </h1>
                <Link to='/'>
                    Начална страница
                </Link>
            </div>
        </div>

    </div>
  )
}

export default PurchaseSuccessPage