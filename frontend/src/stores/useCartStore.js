

import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],   
    total: 0,

    getCartItems: async () => {
        try {
            const res = await axios.get("/cart");
            set({ cart: res.data });
            get().calculateTotal(); // Ensure correct spelling
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    addToCart: async (product) => {
        try {
            await axios.post("/cart", { productId: product._id });
            toast.success("Продуктът беше добавен в количката");

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id);
                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                          item._id === product._id
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                      )
                    : [...prevState.cart, { ...product, quantity: 1 }];
                return { cart: newCart };
            });

            get().calculateTotal(); // Ensure correct function call
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    calculateTotal: () => {
        const { cart } = get();
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Fixed typo
        set({ total });
    },

    removeFromCart: async (productId) => {
        await axios.delete(`/cart`, { data: { productId } });
        set((prevState) => ({
            cart: prevState.cart.filter((item) => item._id !== productId),
        }))
        get().calculateTotal();

    },

    updateQuantity: async (productId, quantity) => {
        if(quantity === 0) {
            get().removeFromCart(productId)
            return
        }

        await axios.put(`/cart/${productId}`, { quantity });
        set((previousState) => ({
            cart: previousState.cart.map((item) => 
                (item._id === productId ? {...item, quantity} : item)),
            
        }))
        get().calculateTotal();
    },

    clearCart: async () => {
        set({ cart: [] , total: 0 });
        try {
            await axios.delete("/cart");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
}));
