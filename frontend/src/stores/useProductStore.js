import {create} from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'
// import { deleteProduct, toggleFeatured } from '../../../backend/controllers/product.controller'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),

    createProduct: async (productData) => {
        try {
            const res = await axios.post("/products", productData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            set((previousState) => ({products: [...previousState.products, res.data], loading: false}))
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при създаване на продукт')
        }
    },
    fetchAllProducts: async() => {
        try {
            const res = await axios.get("/products")
            set({products: res.data.products})
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при извличане на продукти')
        }
    },
    deleteProduct: async (productId) => {
        try {
            await axios.delete(`/products/${productId}`)
            set((previousProducts) => ({
                products: previousProducts.products.filter((product) => product._id     !== productId)
            }))
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при изтриване на продукт')
        }
    },  
    toggleFeaturedProduct: async (productId) => {
        try {
            const response = await axios.patch(`/products/${productId}`)
            set((previousProducts) => ({
                products: previousProducts.products.map((product) => 
                    product._id === productId ? { ... product, isFeatured: response.data.isFeatured } : product)
            }))
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при отличаване на продукт')
        }
    },

    fetchProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`/products/category/${category}`)
            set({products: response.data.products})
        } catch (error) {
            toast.error(error.response.data.message || 'Грешка при извличане на категория продукти')
        }
    }
}))