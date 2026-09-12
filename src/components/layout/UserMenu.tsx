import { NavLink } from "react-router-dom";

interface UserMenuProps {
  user: { name?: string } | null;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  if (user) {
    return (
      <div className="flex items-center gap-x-3">
        <span className="text-sm font-medium text-gray-700 dark:text-amber-300">
          Hello, {user.name}
        </span>
        <button
          type="button"
          onClick={onLogout}
          className="text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-3">
      <NavLink to="/login">
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
        >
          Login
        </button>
      </NavLink>
      <NavLink to="/register">
        <button
          type="button"
          className="text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-gray-300 dark:active:bg-slate-600 border border-gray-200 dark:border-slate-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
        >
          Sign Up
        </button>
      </NavLink>
    </div>
  );
}
