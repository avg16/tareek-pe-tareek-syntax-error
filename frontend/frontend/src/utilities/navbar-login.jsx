import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="bg-white shadow-md p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-pink-600 text-2xl font-bold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="hover:text-pink-700 transition duration-300">
          Tareek pe Tareek
        </Link>
      </motion.div>
      <div className="space-x-4">
        <motion.button
          onClick={() => navigate("/loginpage")}
          className="bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold py-2 px-4 rounded transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        <motion.button
          onClick={() => navigate("/registerpage")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Navbar;