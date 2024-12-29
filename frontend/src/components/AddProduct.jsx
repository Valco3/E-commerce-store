import { useState } from "react";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "fruits",
  "vegetables",
  "meats",
  "dairys",
  "eggs",
  "jams",
  "wines",
  "nuts"
];

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    producer: "",
    price: "",
    category: "",
    image: "",
    quantity: "",
  });

  
  const {createProduct, loading} = useProductStore()


  const handleImageChange = (e) => {
    const file = e.target.files[0];  // Get the selected file
    if (file) {
      setNewProduct({ ...newProduct, image: file });  // Set the image file in the state
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // await createProduct(newProduct);
    // try {
    //   setNewProduct({
    //     name: "",
    //     description: "",
    //     producer: "",
    //     price: "",
    //     category: "",
    //     image: "",
    //     quantity: "",
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    e.preventDefault();

    // Create FormData object to append the data and image as file
    const formData = new FormData();
  
    // Append all product data fields to FormData
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('producer', newProduct.producer);
    formData.append('price', newProduct.price);
    formData.append('category', newProduct.category);
    formData.append('quantity', newProduct.quantity);
  
    // Append the image file directly (not base64 string)
    if (newProduct.image) {
      console.log("Has image")
      formData.append('image', newProduct.image);  // 'image' is the key expected by multer
    }
  
    await createProduct(formData);  // Pass FormData instead of newProduct
          setNewProduct({
        name: "",
        description: "",
        producer: "",
        price: "",
        category: "",
        image: "",
        quantity: "",
      })
  };


  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create a New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Producer */}
          <div>
            <label htmlFor="producer" className="block text-sm font-medium text-gray-700">
              Producer
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="producer"
                name="producer"
                value={newProduct.producer}
                onChange={(e) => setNewProduct({ ...newProduct, producer: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="mt-1">
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Image Upload  */}

                   <div>
            <input
              type="file"
              id="image"
              name="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange} // Handle image selection
            />
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
            >
              <Upload className="w-6 h-6 mr-2 text-gray-500" />
              Upload Image
            </label>
            {newProduct.image && <span className="ml-3 text-sm text-gray-400">{newProduct.image.name}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-5 h-5" aria-hidden="true" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" aria-hidden="true" />
                <span>Add Product</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
