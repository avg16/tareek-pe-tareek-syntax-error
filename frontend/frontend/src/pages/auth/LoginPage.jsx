import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../utilities/navbar-login';
import handleLogin from '../../functions /handleLogin';
import { motion } from 'framer-motion';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayText, setDisplayText] = useState('');
  const navigate = useNavigate();

  // Typing animation effect
  useEffect(() => {
    const phrases = [
      'Find your perfect match',
      'Discover true love',
      'Start your romantic journey',
      'Connect with your soulmate'
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!isDeleting) {
        if (currentCharIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, currentCharIndex + 1));
          currentCharIndex++;
        } else {
          isDeleting = true;
          setTimeout(() => {}, 1500);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentPhrase.slice(0, currentCharIndex - 1));
          currentCharIndex--;
        } else {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
      }
    };

    const interval = setInterval(typeEffect, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-100">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg"
        >
          <motion.h1 
            className="text-3xl font-bold text-center text-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {displayText}
          </motion.h1>
          <form onSubmit={(e) => handleLogin(e, email, password, navigate)} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="w-full px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
          <motion.div 
            className="text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Don't have an account? <a href="/signup" className="text-pink-600 hover:underline">Sign up</a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;