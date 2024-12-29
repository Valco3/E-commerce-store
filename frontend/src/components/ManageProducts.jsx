// import {Trash, Star} from "lucide-react"
// import { useProductStore } from "../stores/useProductStore.js"
// import { motion} from "framer-motion"
// const ManageProducts = () => {
//   const {deleteProduct, products, toggleFeaturedProduct} =useProductStore();


//   console.log("Products", products)
//   return (
    
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, delay: 0.2 }}
      
//     >
//       <table className="min-w-full divide-y divide-gray-700">
//         <thead>
//         <tr>
//           <th
//             scope="col"
//           >
//             Product
//           </th>
//           <th
//             scope="col"
//           >
//             Price
//           </th>
//           <th
//             scope="col"
//           >
//             Category
//           </th>
//           <th
//             scope="col"
//           >
//             In Stock
//           </th>
//           <th
//             scope="col"
//           >
//             Featured
//           </th>
//           <th
//             scope="col"
//             >
//             Actions
//           </th>
//         </tr>
//         </thead>

//         <tbody className='bg-gray-800 divide-y divide-gray-700'>
// 					{products?.map((product) => (
// 						<tr key={product._id} className='hover:bg-gray-700'>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<div className='flex items-center'>
// 									<div className='flex-shrink-0 h-10 w-10'>
// 										<img
// 											className='h-10 w-10 rounded-full object-cover'
// 											src={product.image}
// 											alt={product.name}
// 										/>
// 									</div>
// 									<div className='ml-4'>
// 										<div className='text-sm font-medium text-white'>{product.name}</div>
// 									</div>
// 								</div>
// 							</td>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
// 							</td>
// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<div className='text-sm text-gray-300'>{product.category}</div>
// 							</td>

//               <td>
//                 <div className='text-sm text-gray-300'>{product.quantity}</div>
//               </td>

// 							<td className='px-6 py-4 whitespace-nowrap'>
// 								<button
// 									onClick={() => toggleFeaturedProduct(product._id)}
// 									className={`p-1 rounded-full ${
// 										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
// 									} hover:bg-yellow-500 transition-colors duration-200`}
// 								>
// 									<Star className='h-5 w-5' />
// 								</button>
// 							</td>
              
// 							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
// 								<button
// 									onClick={() => deleteProduct(product._id)}
// 									className='text-red-400 hover:text-red-300'
// 								>
// 									<Trash className='h-5 w-5' />
// 								</button>
// 							</td>
// 						</tr>
// 					))}
// 				</tbody>
//       </table>

//     </motion.div>

//   )
// }

// export default ManageProducts

import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore.js";
import { motion } from "framer-motion";

const ManageProducts = () => {
  const { deleteProduct, products, toggleFeaturedProduct } = useProductStore();

  console.log("Products", products);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <table className="min-w-full divide-y divide-gray-300 bg-gray-50 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Продукт
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Цена
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Категория
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              В наличност
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Препоръчан
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Изтриване
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{product.price.toFixed(2)}лв.</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{product.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{product.quantity}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-2 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-300 text-gray-600"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ManageProducts;
