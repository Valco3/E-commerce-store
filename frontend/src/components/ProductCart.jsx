

// import { ShoppingCart } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useUserStore } from '../stores/useUserStore';
// import { useCartStore } from '../stores/useCartStore';

// const ProductCart = ({ product }) => {
//     const {user} = useUserStore()
//     const {addToCart} = useCartStore()
//   const handleAddToCart = () => {
//     if(user){
//         // Add product to cart
//         addToCart(product)
//     }else{
//         toast.error('Моля влезте в профила си', {id: 'cart'})
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-sm relative overflow-hidden rounded-lg border border-gray-300 shadow-lg bg-white">
//       <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
//         <img
//           className="w-full object-cover"
//           src={product.image}
//           alt="Product"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-20" />
//       </div>

//       <div className="p-4">
//         <h5 className="text-lg font-semibold text-gray-800">{product.name}</h5>
//         <div className="my-2">
//           <p className="text-gray-600 text-sm">
//             <span className="text-xl font-bold text-gray-900">{product.price}лв</span>
//           </p>
//         </div>
//         <button
//           onClick={handleAddToCart}
//           className="flex items-center justify-center w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
//         >
//           <ShoppingCart className="mr-2" size={22} />
//           Добави в количка
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCart;
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCart = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  // State to manage whether the product details modal is visible
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (user) {
      // Add product to cart
      addToCart(product);
      setShowModal(false); // Close the modal once the item is added to the cart
    } else {
      toast.error("Моля влезте в профила си", { id: "cart" });
    }
  };

  const handleShowModal = () => {
    setShowModal(true); // Open the modal with product details
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="flex flex-col w-full max-w-sm relative overflow-hidden rounded-lg border border-gray-300 shadow-lg bg-white">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="w-full object-cover"
          src={product.image}
          alt="Product"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="p-4">
        <h5 className="text-lg font-semibold text-gray-800">{product.name}</h5>
        <div className="my-2">
          <p className="text-gray-600 text-sm">
            <span className="text-xl font-bold text-gray-900">{product.price}лв</span>
          </p>
        </div>

        {/* Button to add to cart */}
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          <ShoppingCart className="mr-2" size={22} />
          Добави в количка
        </button>

        {/* Button to show product details modal */}
        <button
          onClick={handleShowModal}
          className="mt-3 w-full text-blue-600 hover:text-blue-800 transition"
        >
          Виж повече
        </button>
      </div>

      {/* Product Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-xl font-bold">&times;</span>
            </button>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover mb-4"
            />
            <h5 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h5>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">Количество в наличност: </span>
              <span className="text-sm text-gray-800">{product.quantity} броя</span>
            </div>
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">Производител: </span>
              <span className="text-sm text-gray-800">{product.producer} </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Добави в количка
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
