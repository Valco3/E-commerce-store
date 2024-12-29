import {create} from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'
// import { deleteProduct, toggleFeatured } from '../../../backend/controllers/product.controller'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    loading:false,

    createProduct: async (productData) => {
        set({loading: true})
        try {
            const res = await axios.post("/products", productData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            set((previousState) => ({products: [...previousState.products, res.data], loading: false}))
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong')
            set({loading: false})
        }
    },
    fetchAllProducts: async() => {
        set({loading: true})
        try {
            const res = await axios.get("/products")
            set({products: res.data.products, loading: false})
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong')
            set({loading: false})
        }
    },
    deleteProduct: async (productId) => {
        set({loading: true})
        try {
            await axios.delete(`/products/${productId}`)
            set((previousProducts) => ({
                products: previousProducts.products.filter((product) => product._id     !== productId),
                loading: false
            }))
        } catch (error) {
            set({loading: false}),
            toast.error(error.response.data.message || 'Something went wrong')
        }
    },
    toggleFeaturedProduct: async (productId) => {
        set({loading: true})
        try {
            const response = await axios.patch(`/products/${productId}`)
            set((previousProducts) => ({
                products: previousProducts.products.map((product) => 
                    product._id === productId ? { ... product, isFeatured: response.data.isFeatured } : product
                ),
                loading: false
            }))
        } catch (error) {
            set({loading: false}),
            toast.error(error.response.data.message || 'Something went wrong')
        }
    },

    fetchProductsByCategory: async (category) => {
        set({loading: true})
        try {
            const response = await axios.get(`/products/category/${category}`)
            set({products: response.data.products, loading: false})
        } catch (error) {
            set({loading: false}),
            toast.error(error.response.data.message || 'Something went wrong')
        }
    }
}))