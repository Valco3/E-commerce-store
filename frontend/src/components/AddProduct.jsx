import { useState } from "react";
import { PlusCircle, Upload} from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = {
  fruits: "Плодове",
  jams: "Сладка",
  nuts: "Ядки",
};

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

  const { createProduct} = useProductStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setNewProduct({ ...newProduct, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("producer", newProduct.producer);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("quantity", newProduct.quantity);

   
    if (newProduct.image) {
      console.log("Has image");
      formData.append("image", newProduct.image); 
    }

    await createProduct(formData); 
    setNewProduct({
      name: "",
      description: "",
      producer: "",
      price: "",
      category: "",
      image: "",
      quantity: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Добави продукт
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Име на продукт
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>


          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Описание
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>


          <div>
            <label
              htmlFor="producer"
              className="block text-sm font-medium text-gray-700"
            >
              Производител
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="producer"
                name="producer"
                value={newProduct.producer}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, producer: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>


          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Цена
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>


          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Категория
            </label>
            <div className="mt-1">
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Избери категория</option>
                {Object.entries(categories).map(([key, value]) => (
                  <option key={value} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Количество
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, quantity: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>


          <div>
            <input
              type="file"
              id="image"
              name="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
            >
              <Upload className="w-6 h-6 mr-2 text-gray-500" />
              Качи снимка
            </label>
            {newProduct.image && (
              <span className="ml-3 text-sm text-gray-400">
                {newProduct.image.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" aria-hidden="true" />
            <span>Добави продукт</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
