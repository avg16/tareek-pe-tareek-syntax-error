// src/pages/SpecialUsersPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../utilities/navbar-main'; // Import your pre-coded Navbar
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RecommendUsersPage = () => {
  const [specialUsers, setSpecialUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch special users from the backend using axios
  const handleChat = async (selectedUsername) => {
    try {
      // Fetch my user details to get the username
      const response = await axios.get('http://127.0.0.1:8000/users/get-user-details/', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('accessToken')}`  // Send token as a header
        },
        withCredentials: true,  // Keep this if you're still sending CSRF or session cookies
      });
      const myUsername = response.data.username;// Ensure fetchUserDetails returns user data
  
      // Redirect to the chat URL with both usernames
      window.location.href = `chat/${myUsername}/${selectedUsername}`;
    } catch (error) {
      console.error('Error fetching my username:', error);
    }
  }
  const fetchSpecialUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/get-analysis/', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      console.log(response.data);
      setSpecialUsers(response.data);
    } catch (error) {
      console.error('Error fetching special users:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch special users when the component mounts
  useEffect(() => {
    fetchSpecialUsers();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Recommended Users</h1>

        {loading ? (
          <div className="text-center">
            <p>Loading users...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {specialUsers.map((user) => (
              <motion.div
                key={user.username}
                className="p-6 rounded-lg shadow-lg transform transition-all bg-pink-100 duration-300 hover:scale-105 hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  {/* Profile Picture */}
                  <motion.img
                    src={user.profilePicture || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* User Info */}
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.name}</h2>
                  <p className="text-gray-600 mb-1">🌍 City: {user.city}</p>
                  <p className="text-gray-600 mb-1">💞 Dating Status: {user.dating_status}</p>
                  <p className="text-gray-600 mb-1">💞 Sexuality: {user.sexuality}</p>
                  <p className="text-gray-600 mb-1">🌐 LDR Willingness: {user.LDR_willingness ? 'Yes' : 'No'}</p>
                  <motion.button
                    className="mt-4 px-4 py-2 bg-pink-300 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleChat(user.username)}> 
                    Chat
                </motion.button>
                </div>
              </motion.div>
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendUsersPage;
