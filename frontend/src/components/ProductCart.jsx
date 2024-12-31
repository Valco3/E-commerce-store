

import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const ProductCart = ({ product }) => {
    const {user} = useUserStore()
    const {addToCart} = useCartStore()
  const handleAddToCart = () => {
    if(user){
        // Add product to cart
        addToCart(product)
    }else{
        toast.error('Моля влезте в профила си', {id: 'cart'})
    }
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
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          <ShoppingCart className="mr-2" size={22} />
          Добави в количка
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
