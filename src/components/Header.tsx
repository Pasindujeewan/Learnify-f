import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hook/reduxHook";
import { selectUser } from "../features/authSlice";

export function HeaderDesktop() {
  const user = useAppSelector(selectUser);
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);
  return (
    <header className="flex items-center justify-between px-12 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-tight text-blue-600 select-none">
        Learn<span className="text-gray-800">ify</span>
      </div>

      {/* User profile and buttons */}
      <div className="flex items-center gap-x-8">
        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-x-7">
            {[
              { to: "/", label: "Home" },
              { to: "/courses", label: "Courses" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/profile", label: "Profile" },
              { to: "/about", label: "About us" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                      : "text-gray-500 hover:text-blue-600"
                  }`
                }
              >
                <li className="list-none cursor-pointer">{label}</li>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-3">
          {user ? (
            <div>
              <h1>Hello {user.name}</h1>
            </div>
          ) : (
            <div>
              <NavLink to="/login">
                <button className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="text-xl font-extrabold tracking-tight text-blue-600 select-none">
        Learn<span className="text-gray-800">ify</span>
      </div>

      {/* Icons */}
      <div>
        <div className="flex items-center gap-x-2">
          <button className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200">
            Login
          </button>
          <button className="text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
            Sign Up
          </button>
          <button
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isMenuOpen
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-xl" />
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-[calc(100%+8px)] w-52 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-10 overflow-hidden"
            >
              {[
                { to: "/", label: "Home" },
                { to: "/courses", label: "Courses" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/profile", label: "Profile" },
                { to: "/about", label: "About us" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <li className="list-none px-4 py-2.5 cursor-pointer">
                    {label}
                  </li>
                </NavLink>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
