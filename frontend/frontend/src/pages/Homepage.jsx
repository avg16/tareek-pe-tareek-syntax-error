import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../utilities/navbar-main';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get('accessToken');
      if (!token) {
        setError('No token found, please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/users/get-user-details/', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user details.');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    navigate('/edit-user-details', { state: { userDetails } });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-400"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-center py-4"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-gray-800"
        >
          User Profile
        </motion.h1>
        {userDetails ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userDetails.profilePicture && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="col-span-2 sm:col-span-1 mb-6"
              >
                <img
                  src={`${userDetails.profilePicture}`}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full mx-auto shadow-md"
                />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="col-span-2 sm:col-span-1 space-y-4"
            >
              {[
                { label: 'Name', value: userDetails.name },
                { label: 'Superhero Name', value: userDetails.superhero_name },
                { label: 'Preferred Age Range', value: userDetails.preferred_age_range },
                { label: 'Sexuality', value: userDetails.sexuality },
                { label: 'Gender', value: userDetails.gender },
              ].map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + 0.1 * index, duration: 0.5 }}
                  className="text-lg"
                >
                  <span className="font-semibold text-gray-700">{item.label}:</span>{' '}
                  <span className="text-gray-600">{item.value}</span>
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="col-span-2 mt-6"
            >
              <button
                onClick={handleEdit}
                className="w-full px-6 py-3 bg-pink-200 text-pink-700 rounded-lg shadow-md hover:bg-pink-300 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Edit Profile
              </button>
            </motion.div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user details available.</p>
        )}
      </motion.div>
    </>
  );
};

export default UserProfile;