
import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct.jsx";
import ManageProducts from "../components/ManageProducts.jsx";
import { useProductStore } from "../stores/useProductStore.js";
import ManageOrders from "../components/ManageOrders.jsx";

const tabs = [
  { id: "add", label: "Добави продукт" },
  { id: "manage", label: "Управление на продукти" },
  { id: "orders", label: "Управление на поръчки" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("add");

  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gray-100 text-stone-900 flex">
      <aside className="w-1/4 bg-gray-200 shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Администраторски панел</h2>
        <nav className="flex flex-col space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-4 py-3 text-left font-medium rounded-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="w-3/4 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          {activeTab === "add" && <AddProduct />}
          {activeTab === "manage" && <ManageProducts />}
          {activeTab === "orders" && <ManageOrders />}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
