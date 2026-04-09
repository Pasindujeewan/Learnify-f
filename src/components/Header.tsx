import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hook/themeHook";

function ThemeToggleButton({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 overflow-hidden"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <FaMoon className="text-slate-600 text-base" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.6 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute flex items-center justify-center"
          >
            <FaSun className="text-yellow-400 text-base" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function HeaderDesktop() {
  let user = null;
  const { theme, toggleTheme } = useTheme()!;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Invalid JSON in localStorage");
  }
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  return (
    <header className="flex items-center justify-between px-12 py-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm dark:shadow-slate-900/50 sticky top-0 z-50 transition-colors duration-300">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-indigo-400 select-none">
        Learn<span className="text-gray-800 dark:text-slate-100">ify</span>
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
                      ? "text-blue-600 dark:text-indigo-400 border-b-2 border-blue-600 dark:border-indigo-400 pb-0.5"
                      : "text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400"
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
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />

          {user ? (
            <div className="flex items-center gap-x-2">
              <h1 className="text-gray-800 dark:text-amber-300">
                Hello {user.name}
              </h1>
            </div>
          ) : (
            <div className="flex items-center gap-x-3">
              <NavLink to="/login">
                <button className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-700 px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-gray-300 dark:active:bg-slate-600 border dark:border-slate-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
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
    <header className="relative flex items-center justify-between px-5 py-3.5 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm dark:shadow-slate-900/50 sticky top-0 z-50 transition-colors duration-300">
      {/* Logo */}
      <div className="text-xl font-extrabold tracking-tight text-blue-600 dark:text-indigo-400 select-none">
        Learn<span className="text-gray-800 dark:text-slate-100">ify</span>
      </div>

      {/* Icons */}
      <div>
        <div className="flex items-center gap-x-2">
          <button className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200">
            Login
          </button>
          <button className="text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-gray-300 dark:border dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
            Sign Up
          </button>
          <button
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isMenuOpen
                ? "bg-blue-50 dark:bg-indigo-900/40 text-blue-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-slate-200"
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
              className="absolute right-4 top-[calc(100%+8px)] w-52 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-slate-900/60 py-2 z-10 overflow-hidden"
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
                        ? "text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-indigo-900/30"
                        : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200"
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
