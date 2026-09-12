import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name?: string } | null;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

export function MobileDrawer({
  isOpen,
  onClose,
  user,
  onLogout,
  theme,
  toggleTheme,
}: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute right-4 top-[calc(100%+8px)] w-60 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-slate-900/60 p-3 z-50"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
              Menu
            </span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <ul className="space-y-1">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-indigo-900/30 font-semibold"
                        : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-slate-800">
            {user ? (
              <div className="space-y-2">
                <p className="px-3 text-xs text-gray-500 dark:text-slate-400 truncate">
                  Signed in as <span className="font-semibold text-gray-700 dark:text-slate-200">{user.name}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className="text-center py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={onClose}
                  className="text-center py-2 text-xs font-semibold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
