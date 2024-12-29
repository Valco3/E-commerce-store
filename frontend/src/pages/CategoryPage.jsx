// import { useEffect } from "react"
// import { useProductStore } from "../stores/useProductStore"
// import { useParams } from "react-router-dom"
// import ProductCart from "../components/ProductCart"

// const CategoryPage = () => {
//     const {fetchProductsByCategory, products} = useProductStore() 
//     const {category} = useParams()

//     useEffect(() => {
//         fetchProductsByCategory(category)
//     }, [fetchProductsByCategory, category])

//     console.log("Products", products)
//   return (
//       <div className="min-h-screen">
//         <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {category.charAt(0).toUpperCase() + category.slice(1)}

//           {products?.length === 0 && (
//             <h2>
//               Няма продукти в тази категория
//             </h2>
//           )}

//           {products?.map((product) => (
//             <ProductCart key={product._id} product={product} />
//           ))}
//         </div>
//       </div>
//     )
// }

// export default CategoryPage

import { useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { useParams } from 'react-router-dom';
import ProductCart from '../components/ProductCart';

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-8">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1> */}

        {products?.length === 0 && (
          <h2 className="text-lg text-gray-500">
            Няма продукти в тази категория
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
