import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const handleRegister = async (e, username, email, password, navigate) => {
  e.preventDefault(); // Prevent the default form submission behavior

  try {
    // Send a POST request to the backend to register the user
    const response = await axios.post('http://127.0.0.1:8000/users/register/', {
      username,
      email,
      password,
    }, {
      withCredentials: true, // Send credentials with the request
    });

    console.log(response.data);

    // Extract tokens from the response if the backend provides them after registration
    
    alert("You have been registered! Please login with these credentials.")
    // Navigate the user to the next page after successful registration
    navigate('/loginpage'); // Change this route as per your requirement

  } catch (error) {
    // Handle registration errors (e.g., username or email already taken)
    alert('Error during registration: Email or name already in use');

    // Optionally alert the user about registration issues
    // alert("Registration failed! Please try again.");
  }
};

export default handleRegister;
