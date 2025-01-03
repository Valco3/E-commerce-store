import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore.js";
import { useUserStore } from "../stores/useUserStore.js";
import UserOrders from "../components/UserOrders.jsx";

const tabs = [{ id: "orders", label: "Поръчки" }];

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const {user} = useUserStore();


  const { fetchUserOrders } = useOrderStore();

  useEffect(() => {
    fetchUserOrders(user);
  }, [fetchUserOrders, user]);

  return (

    <div className="min-h-screen bg-gray-100 text-stone-900 flex">
      <aside className="w-1/4 bg-gray-200 shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Потребителски панел</h2>
        <p className="mb-4 text-gray-600">Потребител: {user.name}</p>
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
          {activeTab === "orders" && <UserOrders />}
        </div>
      </main>
    </div>

  )
};

export default UserPage;
