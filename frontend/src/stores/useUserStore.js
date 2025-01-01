import {create} from 'zustand'
import axios from '../lib/axios'
import {toast} from 'react-hot-toast'


export const useUserStore = create((set, get) => ({
    user: null,
    loading:false,
    checkingAuth:true,
    season:"winter",

    signup: async ({name, email, password, confirmPassword}) => {
        set({loading: true})

        if(password !== confirmPassword) {
            set({loading: false})
            return toast.error('Паролите не съвпадат')
        }
            try {
                const res = await axios.post('/auth/signup', {name, email, password});
                set({user: res.data, loading: false})
            } catch (error) {
                set({loading: false})
                toast.error(error.response.data.message || 'Something went wrong')
            }
        
    },

    login : async (email, password) => {
        set({loading: true})
        
        try {
            const res = await axios.post('/auth/login', {email, password});
            set({user: res.data, loading: false})
        } catch (error) {
            set({loading: false})
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
		// Prevent multiple simultaneous refresh attempts
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

// let refreshPromise = null;
// axios.interceptors.response.use(
//     (response) => response,
//     async(error) => {
//         const originalRequest = error.config;
//         if(error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 if(refreshPromise){
//                     await refreshPromise
//                     return axios (originalRequest)
//                 }

//                 refreshPromise = useUserStore.getState().refreshToken()
//                 await refreshPromise
//                 refreshPromise = null
//                 return axios(originalRequest)
//             } catch (error) {
//                 useUserStore.getState().logout()
//                 return Promise.reject(error)
//             }
//         }
//         return Promise.reject(error)
//     }
// )