// import {Plus, Minus, Trash} from "lucide-react"
// import { useCartStore } from "../stores/useCartStore"
// const CartItem = ({item}) => {
//    const {removeFromCart, updateQuantity} = useCartStore()

//   return (
//     <div className="flex items-center gap-2 border-b py-4 border-gray-200 dark:border-gray-700">
//         <div className="space-y-2 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//             <div>
//                 <img className="h-20 md:h-32 rounded object-cover" src={item.image} />
//             </div>
//             <div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
//             </div>
//             <div className="flex items-center justify-between md:order-3 md:justify-end">
//                 <div className="flex items-center gap-2">
//                     <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center  border border-gray-300 bg-white text-gray-600 hover:bg-gray-100">
//                         <Minus className="h-4 w-4" />
//                     </button>
//                     <span className="text-gray-600 dark:text-gray-400">{item.quantity}</span>
//                     <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center  border border-gray-300 bg-white text-gray-600 hover:bg-gray-100">
//                         <Plus className="h-4 w-4" />
//                     </button>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <span className="text-gray-600 dark:text-gray-400">{item.price}лв.</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-300">
//                         <Trash className="h-5 w-5" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CartItem
import { Plus, Minus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 w-full max-w-3xl flex items-center gap-4 border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <img
        className="h-20 w-20 md:h-32 md:w-32 rounded object-cover"
        src={item.image}
        alt={item.name}
      />

      {/* Details */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {item.description}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="flex justify-center items-center w-8 h-8 bg-gray-200 text-gray-700 rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Minus className="h-5 w-5" />
        </button>
        <span className="text-gray-700 dark:text-gray-400">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="flex justify-center items-center w-8 h-8 bg-gray-200 text-gray-700 rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Price */}
      <div className="text-gray-700 dark:text-gray-400">{item.price}лв.</div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="flex justify-center items-center w-8 h-8 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <Trash className="h-5 w-5" />
      </button>
    </motion.div>
  );
};

export default CartItem;
