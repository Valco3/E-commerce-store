

import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import {useUserStore} from '../stores/useUserStore.js'

const Navbar = () => {
  // const user = false;
  const {user, logout} = useUserStore()
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  return (
    <header className="bg-gray-100 text-stone-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-800"
        >
          Спрингмарт
        </Link>
        <nav className="flex space-x-6 items-center">
          {/* <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link> */}
          {user && (
            <Link
              to={"/cart"}
              className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-2 -right-2">
                3
              </span>
            </Link>
          )}
          {isAdmin && (
            <Link
              to={"/admin"}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Lock className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          )}

          {user ? (
            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600" onClick={logout}>
              <LogOut className="w-5 h-5" />
              <span>Изход</span>
            </button>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <UserPlus className="w-5 h-5" />
                <span>Регистрация</span>
              </Link>
              <Link
                to={"/login"}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <LogIn className="w-5 h-5" />
                <span>Вход</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
