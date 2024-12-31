
import { useCartStore } from '../stores/useCartStore'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import RecommendedItems from '../components/RecommendedItems'
import OrderSummary from '../components/OrderSummary'

const CartPage = () => {
    const { cart } = useCartStore();

    return (
        <div className="py-8 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    {/* Left section: Cart items */}
                    <div className="lg:w-2/3 space-y-6">
                        {cart.length === 0 ? (
                            <div>
                                <ShoppingCart className="w-24 h-24 text-gray-300" />
                                <h3 className="text-2xl font-semibold text-gray-300">Количката Ви е празна</h3>
                                <Link
                                    className="mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                    to="/"
                                >
                                    Разгледай категориите с продукти
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cart.map((item) => (
                                    <CartItem key={item._id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    
                    {cart.length > 0 && (
                        <div className="lg:w-1/3 mt-8 lg:mt-0 lg:ml-8">
                            <OrderSummary />
                        </div>
                    )}
                </div>

                
                {cart.length > 0 && <RecommendedItems />}
            </div>
        </div>
    );
};

export default CartPage;
