import { useState, useEffect } from 'react'
import axios from '../lib/axios'
import { toast } from 'react-hot-toast'
import ProductCart from './ProductCart'
const RecommendedItems = () => {
  const [recommendations, setRecommendations] = useState([]);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/featured");
				setRecommendations(res.data.sort(() => Math.random() - 0.5)
				.slice(0, 3));
  
			} catch (error) {
				toast.error(error.response.data.message || "Грешка при извличането на предложените продукти");
			} 
		};

		fetchRecommendations();
	}, []);


	return (
		<div className='mt-8'>
  <h3 className='text-2xl font-semibold'>Предложени продукти</h3>
  <div className='mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
    {recommendations.map((product) => (
      <ProductCart key={product._id} product={product} />
    ))}
  </div>
</div>

	);
}

export default RecommendedItems
