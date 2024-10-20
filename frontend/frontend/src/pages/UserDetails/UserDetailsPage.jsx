import React from "react";
import CreateUserDetailsForm from "./UserDetailForm";
import Navbar from "../../utilities/navbar-login";
const UserDetailsPage = () => {
  return (
    <>
    <Navbar /> 
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
    
      <h1 className="text-3xl font-bold mb-6 text-center">Create User Details</h1>
      <div className="w-full max-w-md">
        <CreateUserDetailsForm />
      </div>
    </div>
    </>
  );
};

export default UserDetailsPage;

