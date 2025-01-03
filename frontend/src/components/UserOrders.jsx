import { useUserStore } from "../stores/useUserStore.js";
import { useOrderStore } from "../stores/useOrderStore.js";
import { useEffect } from "react";

const UserOrders = () => {
  const { user } = useUserStore();
  const { fetchUserOrders, orders } = useOrderStore();

  const statusMap = {
    pending: "Очаква доставка/вземане",
    complete: "Доставена/взета",
    cancelled: "Отказана",
  };

  useEffect(() => {
    fetchUserOrders(user);
  }, [fetchUserOrders, user]);

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300 bg-gray-50 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.products.map((product, index) => (
                  <div key={index}>{product.productName}</div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.totalAmount} лв
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {statusMap[order.status]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
