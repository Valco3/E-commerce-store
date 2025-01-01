import { Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 w-full max-w-3xl flex items-center gap-4 border-b border-gray-200 dark:border-gray-700"
    >
      <img
        className="h-20 w-20 md:h-32 md:w-32 rounded object-cover"
        src={item.image}
        alt={item.name}
      />

      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {item.description}
        </p>
      </div>

      <div className="flex-1 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Единична цена
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {item.price}лв.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="flex justify-center items-center w-8 h-8 bg-gray-200 text-gray-700  shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="text-gray-700 dark:text-gray-400">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="flex justify-center items-center w-8 h-8 bg-gray-200 text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>


      <div className="flex-1 space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Сума
        </h3>
        <div className="text-gray-700 dark:text-gray-400">{item.price * item.quantity}лв.</div>
      </div>
      
      <button
        onClick={() => removeFromCart(item._id)}
        className="flex justify-center items-center w-8 h-8 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <Trash className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
