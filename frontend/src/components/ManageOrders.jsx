import { useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import { motion } from "framer-motion";

const ManageOrders = () => {
  const { fetchAllOrders, changeOrderStatus, orders } = useOrderStore();

  useEffect(() => {
    fetchAllOrders(); 
  }, [fetchAllOrders]);

  const handleStatusChange = (orderId, newStatus) => {
    changeOrderStatus(newStatus, orderId); 
  };

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
              Потребител
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Продукти
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Сума
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Статус
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Дата
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.userName} {/* Assuming user object has a name */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.products.map((product, index) => (
                  <div key={index}>{product.productName}</div> // Display product names
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.totalAmount} лв {/* Assuming totalAmount field exists */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  <option value="pending">Очаква доставка</option>
                  <option value="complete">Доставена</option>
                  <option value="cancelled">Отказана</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()} {/* Format date */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ManageOrders;