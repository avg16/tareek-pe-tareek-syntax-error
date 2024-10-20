import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Framer Motion for animations
import Cookies from 'js-cookie';
import DateRequestForm from '../../dates/components/DateForm'; // Import the DateRequestForm component
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import fetchUserDetails from '../../../functions /fetchUserDetails'; // Import the function to fetch your user details

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [myUsername, setMyUsername] = useState(null); // Store your username
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch all users and their details from the backend using axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/get-all-users-details/', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Delete user by username
  const deleteUser = async (username) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/delete-user/${username}/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      // After deleting, refetch the users
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle asking for a date
  const handleAskForDate = (username) => {
    setSelectedUser(username);
    setFormVisible(true);
  };

  // Close the date form
  const closeForm = () => {
    setFormVisible(false);
    setSelectedUser(null);
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle chat redirection
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
      window.location.href = `/chat/${myUsername}/${selectedUsername}`;
    } catch (error) {
      console.error('Error fetching my username:', error);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {users.map((user) => (
          <motion.div
            key={user.username}
            className=" p-6 rounded-lg shadow-lg transform transition-all bg-pink-100 duration-300 hover:scale-105 hover:shadow-2xl"
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
              <p className="text-gray-600 mb-1">🌐 LDR Willingness: {user.LDR_willingness ? 'Yes' : 'No'}</p>

              {/* Ask for Date Button */}
              <motion.button
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleAskForDate(user.username)} // Pass the username here
              >
                Ask for a Date
              </motion.button>

              {/* Chat Button */}
              <motion.button
                className="mt-4 px-4 py-2 bg-pink-300 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleChat(user.username)}  // Start chat on button click
              >
                Chat
              </motion.button>

              {/* Delete Button */}
              <motion.button
                className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-full shadow-md hover:bg-red-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                onClick={() => deleteUser(user.username)} // Delete user on button click
              >
                Delete User
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show the Date Request Form if visible */}
      {isFormVisible && (
        <DateRequestForm username={selectedUser} onClose={closeForm} />
      )}
    </div>
  );
};

export default AllUsers;
