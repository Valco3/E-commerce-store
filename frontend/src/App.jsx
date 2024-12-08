import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './components/Navbar.jsx'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore.js'
import { useEffect } from 'react'

function App() {
  const {user, checkAuth} = useUserStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className='min-h-screen bg-gray-200 text-stone-900 relative overflow-hidden'>

      {/* pt-20 */}
      <div className='relative z-50 pt-0'>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={user ? <Navigate to='/'/> : <SignUpPage/>}/>
          <Route path='/login' element={user ? <Navigate to='/'/> : <LoginPage/>}/>
        </Routes>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
