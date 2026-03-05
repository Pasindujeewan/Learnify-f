import { FaSearch, FaBars } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderDesktop() {
  return (
    <header className="flex items-center justify-between p-4 bg-white px-10 ">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">Learnify</div>
      {/* Search bar */}
      <div className="relative" style={{ width: "300px" }}>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-500 text-small text-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {/* User profile and buttons*/}
      <div className="flex items-center space-x-6">
        <button className="text-white bg-primary px-5 py-2 rounded-md hover:bg-blue-600">
          Login
        </button>
        <button className="text-gray-600 hover:text-gray-800">Sign Up</button>
      </div>
    </header>
  );
}

export function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">Learnify</div>

      {/* Icons */}
      <div className=" relative">
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-600 text-lg" />

          <FaBars
            className="text-gray-600 text-lg cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10"
            >
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Home
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Courses
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Dashboard
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                About us
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
