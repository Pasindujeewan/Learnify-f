import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

export function HeaderDesktop() {
  return (
    <header className="flex items-center justify-between p-4 bg-white px-10 ">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">Learnify</div>
      {/* Search bar */}

      {/* User profile and buttons*/}
      <div className="flex items-center space-x-6">
        {/* Navigation Links */}
        <div className="flex">
          <ul className="flex space-x-6">
            <NavLink to="/">
              <li className="hover:text-blue-600 text-gray-600 cursor-pointer">
                Home
              </li>
            </NavLink>
            <NavLink to="/courses">
              <li className="hover:text-blue-600 text-gray-600 cursor-pointer">
                Courses
              </li>
            </NavLink>
            <NavLink to="/dashboard">
              <li className="hover:text-blue-600 text-gray-600 cursor-pointer">
                Dashboard
              </li>
            </NavLink>
            <NavLink to="/profile">
              <li className="hover:text-blue-600 text-gray-600 cursor-pointer">
                Profile
              </li>
            </NavLink>
            <NavLink to="/about">
              <li className="hover:text-blue-600 text-gray-600 cursor-pointer">
                About us
              </li>
            </NavLink>
          </ul>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-x-3">
          <button className="text-white bg-primary px-5 py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
          <button className="text-gray-600 bg-gray-200 px-3 py-2 rounded-md hover:text-gray-800">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=" relative flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">Learnify</div>

      {/* Icons */}
      <div className="">
        <div className="flex items-center space-x-2">
          <button className="text-white bg-primary px-5 py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
          <button className="text-gray-600 bg-gray-200 px-3 py-2 rounded-md hover:text-gray-800">
            Sign Up
          </button>
          <FaBars
            className="text-gray-600 text-2xl cursor-pointer"
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
              className="absolute right-0 top-17 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10 gap-y-2"
            >
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                <li className="px-4 py-2 active:bg-gray-200 cursor-pointer transition duration-200">
                  Home
                </li>
              </NavLink>
              <NavLink to="/courses" onClick={() => setIsMenuOpen(false)}>
                <li className="px-4 py-2 active:bg-gray-200 cursor-pointer transition duration-200">
                  Courses
                </li>
              </NavLink>
              <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <li className="px-4 py-2 active:bg-gray-200 cursor-pointer transition duration-200">
                  Dashboard
                </li>
              </NavLink>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                <li className="px-4 py-2 active:bg-gray-200 cursor-pointer transition duration-200">
                  Profile
                </li>
              </NavLink>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                <li className="px-4 py-2 active:bg-gray-200 cursor-pointer transition duration-200">
                  About us
                </li>
              </NavLink>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
