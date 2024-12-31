import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import Navbar from './components/Navbar.jsx'
import CartPage from './pages/CartPage.jsx'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore.js'
import { useEffect } from 'react'
import { useCartStore } from './stores/useCartStore.js'

function App() {
  const {user, checkAuth} = useUserStore()
  const {getCartItems} = useCartStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    getCartItems()
  }, [getCartItems])

  useEffect(() => {
    document.title = 'Спрингмарт';
}, []);
//#cbd5e1  bg-slate-200
  return (
    <div className='min-h-screen bg-slate-300 text-stone-900 relative overflow-hidden'>
      
      {/* pt-20 */}
      <div className='relative z-50 pt-0'>
        <Navbar />
        {/* <img src={'http://localhost:5000/images/b71fafb0-b585-4bb9-9b8b-32f9915de5aa.jpg'} alt="Category Fruit" /> */}

        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={user ? <Navigate to='/'/> : <SignUpPage/>}/>
          <Route path='/login' element={user ? <Navigate to='/'/> : <LoginPage/>}/>
          <Route path='/admin' element={user?.role == "admin" || user?.role == "superadmin" ? <AdminPage /> : <Navigate to='/'/>}/>
          <Route path='/category/:category' element={<CategoryPage/>}/>
          <Route path='/cart' element={user? <CartPage/> : <Navigate to='/login'/>}/> 
        </Routes>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
