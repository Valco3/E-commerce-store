import {create} from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'

export const useOrderStore = create((set) => ({
    
    orders: [],

    fetchAllOrders: async() => {
        try {
            const res = await axios.get("/orders")
            set({orders: res.data.orders})
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при извличане на поръчки')   
        }
    },

    fetchUserOrders: async(user) => {
        try {
            const res = await axios.get("/orders/user", {user: user})
            set({orders: res.data.orders})
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при извличане на поръчки')   
        }
    },

    changeOrderStatus: async (status, orderId) => {
        try {
            const res = await axios.post(`/orders/change-status`, {status: status,orderId: orderId})
            set((previousOrders) => ({
                orders: previousOrders.orders.map((order) => 
                    order._id === orderId ? { ... order, status: res.data.status } : order)
            }))
        } catch (error) {
           toast.error(error.response.data.message || 'Грешка при промяна на статуса на поръчката')
        }
    },
}))