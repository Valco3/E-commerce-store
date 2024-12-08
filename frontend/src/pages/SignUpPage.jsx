// import {useState} from 'react'
// import {Link} from 'react-router-dom'
// import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
// import {motion} from 'framer-motion'

// const SignUpPage = () => {
//     const loading = false;
//     const [formData, setFormData] = useState({
//         name:"",
//         email:"",
//         password:"",
//         confirmPassword:""
//     })

//     const handleSubmit = (e) =>{
//         e.preventDefault()
//         console.log(formData)
//     }
//   return (
//     <div>
//         <motion.div 
//             initial={{opacity:0, y:-20}}
//             animate={{opacity:1, y:0}}
//             transition={{duration:0.8, delay:0.2}}
//         >
//             <h2>Create your account</h2>
            
//         </motion.div>

//         <motion.div 
//             initial={{opacity:0, y:-20}}
//             animate={{opacity:1, y:0}}
//             transition={{duration:0.8, delay:0.2}}
//         >
//             <div>
//                 <form onSubmit={handleSubmit} className='space-y-6'>
//                     <div>
//                         <label htmlFor="name">Full name</label>
//                         <div>
//                             <input 
//                                 id= 'name'
//                                 type= 'text'
//                                 required
//                                 value = {formData.name}
//                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                                 placeholder='Ivan Ivanov'/>
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="email">Email address</label>
//                         <div>
//                             <input 
//                                 id= 'email'
//                                 type= 'email'
//                                 required
//                                 value = {formData.email}
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                                 placeholder='ivanivanov@gmail.com'/>
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="password">Password</label>
//                         <div>
//                             <input 
//                                 id= 'password'
//                                 type= 'password'
//                                 required
//                                 value = {formData.password}
//                                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                                 placeholder='securepass123'/>
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="confirmPassword">Confirm password</label>
//                         <div>
//                             <input 
//                                 id= 'confirmPassword'
//                                 type= 'password'
//                                 required
//                                 value = {formData.confirmPassword}
//                                 onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//                                 placeholder='securepass123'/>
//                         </div>
//                     </div>
//                     <button type='submit' disabled={loading}>
//                         {loading ? (
//                             <>
//                                 <Loader className='animate-spin' aria-hidden='true' />
//                                 Loading ...
//                             </>
//                         ) : (
//                             <>
//                                 <UserPlus aria-hidden='true' />
//                                 Sign up
//                             </>
//                         )}
//                     </button>
//                 </form>

//                 <p>Already have an account? {" "} <Link to='/login'>Log in <ArrowRight className='inline h-4 w-4'/> </Link></p>
//             </div>
            
//         </motion.div>
//     </div>
//   )
// }

// export default SignUpPage


import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {signup, loading} =  useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-stone-900">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ivan Ivanov"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivanivanov@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="securepass123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="securepass123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-5 h-5" aria-hidden="true" />
                <span>Loading ...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" aria-hidden="true" />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Log in <ArrowRight className="inline h-4 w-4" />
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
