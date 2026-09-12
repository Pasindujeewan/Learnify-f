import { NavLink } from "react-router-dom";

export interface NavItem {
  to: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/resources/pdf", label: "PDF Tool" },
  { to: "/aboutus", label: "About" },
];

interface NavLinksProps {
  onItemClick?: () => void;
  className?: string;
  itemClassName?: string | ((isActive: boolean) => string);
}

export function NavLinks({ onItemClick, className = "flex items-center gap-x-7", itemClassName }: NavLinksProps) {
  return (
    <nav>
      <ul className={className}>
        {NAV_ITEMS.map(({ to, label }) => (
          <li key={to} className="list-none">
            <NavLink
              to={to}
              onClick={onItemClick}
              className={({ isActive }) =>
                typeof itemClassName === "function"
                  ? itemClassName(isActive)
                  : itemClassName
                    ? itemClassName
                    : `text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-indigo-400 border-b-2 border-blue-600 dark:border-indigo-400 pb-0.5"
                          : "text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-indigo-400"
                      }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
