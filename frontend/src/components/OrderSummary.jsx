import { useCartStore } from "../stores/useCartStore"

const OrderSummary = () => {
  const {total} = useCartStore();
  const formattedTotal = total.toFixed(2);
  return (
    <div className="space-y-4 rounded-lg bg-gray-50 p-4 border sm:p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-900">Обща стойност</p>

      <div className="flex justify-between text-base font-semibold text-gray-900">
        {/* <p>Общо</p> */}
        <p>{formattedTotal}лв</p>
      </div>
      <button className="w-full rounded-md bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
        Направи поръчка
      </button>
    </div>
  )
}

export default OrderSummary