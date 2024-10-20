// src/pages/AllUsersPage.jsx
import React from 'react';
import Navbar from '../../utilities/navbar-main'; // Import your pre-coded Navbar
import AllUsers from './components/AllUsers';

const AllUsersPage = () => {
  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Meet the Community</h1>

        {/* All Users Component */}
        <AllUsers />
      </div>
    </div>
  );
};

export default AllUsersPage;
