import { Trash, Star} from "lucide-react";
import { useProductStore } from "../stores/useProductStore.js";
import { useState } from "react";

const ManageProducts = () => {
  const { deleteProduct, products, toggleFeaturedProduct, updateProduct } = useProductStore();
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const categoryMap = {
    fruits: "Плодове",
    jams: "Сладка",
    nuts: "Ядки",
  }

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditedProduct({ ...product }); 
  };

  const handleSaveClick = async () => {
    await updateProduct(editedProduct);
    setEditingProductId(null);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300 bg-gray-50 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Продукт
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Цена
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Категория
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              В наличност
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Препоръчан
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Редактиране
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Изтриване
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100 transition-colors">
              {editingProductId === product._id ? (
                <>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) => setEditedProduct({ ...editedProduct, price: +e.target.value })}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{categoryMap[product.category]}</span>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={editedProduct.quantity}
                      onChange={(e) => setEditedProduct({ ...editedProduct, quantity: +e.target.value })}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeaturedProduct(product._id)}
                      className={`p-2 ${
                        product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-300 text-gray-600"
                      } hover:bg-yellow-500 transition-colors duration-200`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleSaveClick}
                      className="text-green-500 hover:text-green-400 transition-colors"
                    >
                      Запази
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="ml-4 text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{product.price.toFixed(2)}лв.</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{categoryMap[product.category]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{product.quantity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeaturedProduct(product._id)}
                      className={`p-2 ${
                        product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-300 text-gray-600"
                      } hover:bg-yellow-500 transition-colors duration-200`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      Промени
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
