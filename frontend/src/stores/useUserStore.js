import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useUserStore = create((set, get) => ({
    user: null,
    checkingAuth:true,
    season:"winter",

    signup: async ({name, email, password, confirmPassword}) => {
        if(password !== confirmPassword) {
            return toast.error('Паролите не съвпадат')
        }
            try {
                const res = await axios.post('/auth/signup', {name, email, password});
                set({user: res.data})
            } catch (error) {
                toast.error(error.response.data.message || 'Something went wrong')
            }
        
    },

    login : async (email, password) => {
        
        try {
            const res = await axios.post('/auth/login', {email, password});
            set({user: res.data})
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong')
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout")
            set({user: null})
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    },

    checkAuth: async () => {
        set ({checkingAuth: true})
        try {
            const response = await axios.get('/auth/profile')
            set({user: response.data, checkingAuth: false})
        } catch (error) {
            set({checkingAuth: false, user: null})
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    },

	refreshToken: async () => {
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	}
}))
