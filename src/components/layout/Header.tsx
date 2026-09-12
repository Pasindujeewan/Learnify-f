import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { logoutUser } from "../../services/authService";
import { ThemeToggle } from "./ThemeToggle";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const toast = useToast();

  let user: { name?: string } | null = null;
  try {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch {
    sessionStorage.removeItem("user");
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore API logout failures and clean up client state
    }
    sessionStorage.removeItem("user");
    toast.info("You have been signed out.", "Logged out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-indigo-400 select-none hover:opacity-90 transition-opacity"
        >
          Learn<span className="text-gray-800 dark:text-slate-100">ify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-8">
          <NavLinks />
          <div className="flex items-center gap-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <UserMenu user={user} onLogout={handleLogout} />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className="md:hidden">
        <MobileDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          user={user}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>
    </header>
  );
}

// Backward compatibility exports for existing App.tsx layout
export const HeaderDesktop = Header;
export const HeaderMobile = Header;
export default Header;
