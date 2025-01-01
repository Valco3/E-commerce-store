

// import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
// import { Link } from "react-router-dom";
// import {useUserStore} from '../stores/useUserStore.js'
// import {useCartStore} from '../stores/useCartStore.js'  

// const Navbar = () => {
//   // const user = false;
//   const {user, logout} = useUserStore()
//   const isAdmin = user?.role === "admin" || user?.role === "superadmin";
//   const {cart} = useCartStore()

//   return (
//     <header className="bg-gray-100 text-stone-900 shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         <Link
//           to="/"
//           className="text-2xl font-bold text-blue-600 hover:text-blue-800"
//         >
//           Спрингмарт
//         </Link>
//         <nav className="flex space-x-6 items-center">
//           {/* <Link
//             to="/"
//             className="text-gray-700 hover:text-blue-600 font-medium"
//           >
//             Home
//           </Link> */}
//           {user && (
//             <Link
//               to={"/cart"}
//               className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               <span>Количка</span>
//               {cart.length > 0 && <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-2 -right-2">
//                 {cart.length}
//               </span>}
//             </Link>
//           )}
//           {isAdmin && (
//             <Link
//               to={"/admin"}
//               className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
//             >
//               <Lock className="w-5 h-5" />
//               <span>Администраторски панел</span>
//             </Link>
//           )}

//           {user ? (
//             <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600" onClick={logout}>
//               <LogOut className="w-5 h-5" />
//               <span>Изход</span>
//             </button>
//           ) : (
//             <>
//               <Link
//                 to={"/signup"}
//                 className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
//               >
//                 <UserPlus className="w-5 h-5" />
//                 <span>Регистрация</span>
//               </Link>
//               <Link
//                 to={"/login"}
//                 className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
//               >
//                 <LogIn className="w-5 h-5" />
//                 <span>Вход</span>
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUserStore } from '../stores/useUserStore.js';
import { useCartStore } from '../stores/useCartStore.js';
import Hamburger from 'hamburger-react';

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ref for the dropdown menu
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-100 text-stone-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          Спрингмарт
        </Link>
        <div className="flex items-center space-x-6">
          {user && (
            <Link
              to={"/cart"}
              className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Количка</span>
              {cart.length > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-2 -right-2">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {/* Hamburger menu */}
          {user && (
            <div className="relative" ref={menuRef}>
              <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
              {isMenuOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 z-50">
                  <nav className="space-y-4">
                    {user && (
                      <span>{user.name}</span>
                    )}
                    {isAdmin && (
                      <Link
                        to={"/admin"}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                      >
                        <Lock className="w-5 h-5" />
                        <span>Администраторски панел</span>
                      </Link>
                    )}
                    <button
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Изход</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}

          {!user && (
            <>
              <Link
                to={"/signup"}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <UserPlus className="w-5 h-5" />
                <span>Регистрация</span>
              </Link>
              {/* <Link
                to={"/login"}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <LogIn className="w-5 h-5" />
                <span>Вход</span>
              </Link> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
