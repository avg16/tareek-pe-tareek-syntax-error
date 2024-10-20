import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import handleLogout from '../functions /handleLogout';
import fetchUserDetails  from '../functions /fetchUserDetails';


function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUserDetails(setUser);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <motion.nav 
      className="bg-pink-200 p-4 flex justify-between items-center relative overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Hearts */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 text-2xl"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 50 
          }}
          animate={{ 
            y: -50,
            transition: { 
              repeat: Infinity, 
              duration: 5 + Math.random() * 5,
              ease: "linear"
            }
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="flex items-center">
        {/* Logo */}
        {/* <img 
          src="tareek_pe_tareek.png" // replace with your logo's path
          alt=""
          className="w-15 h-10 mr-2" // adjust size and margin as needed
        /> */}
        <motion.div 
          className="text-black text-2xl font-bold"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/" className="hover:bg-pink-300 text-black  py-2 rounded transition duration-300">
            Tareek Pe Tareek
          </Link>
        </motion.div>
      </div>

      {/* Hamburger Menu for small screens */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-black focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 bg-pink-200 w-64 z-30 md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <button onClick={toggleSidebar} className="text-black focus:outline-none mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <nav className="space-y-4">
                {['Matches', 'Messages', 'Events', 'Profile'].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase()}`} className="block text-black hover:bg-pink-300 px-4 py-2 rounded transition duration-300">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Regular Navigation Links (Visible on Medium and Large Screens) */}
      <div className="hidden md:flex space-x-8 items-center">
        {['Homepage', 'Fantasy', 'Users','Dates','Recomendations'].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={`/${item.toLowerCase()}`} className="hover:bg-pink-300 text-black px-4 py-2 rounded transition duration-300">
              {item}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Profile Section */}
      <div className="relative flex items-center ml-auto space-x-4">
        <motion.div
          className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center cursor-pointer ${
            user && user.profilePicture ? '' : 'bg-gray-400'
          }`}
          onClick={toggleDropdown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {user && user.profilePicture ? (
            <img
              src={`${user.profilePicture}`}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          ) : (
            <span className="text-black">P</span>
          )}
        </motion.div>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              ref={dropdownRef}
              className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-2">
                <button
                  onClick={() => handleLogout(navigate)}
                  className="block px-4 py-2 text-red-600 hover:bg-pink-100 w-full text-left transition duration-300"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
