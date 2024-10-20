import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const handleLogin = async (e, email, password, navigate) => {
  e.preventDefault(); // Prevent the default form submission behavior

  try {
    // Attempt to log in the user
    const response = await axios.post('http://127.0.0.1:8000/users/login/', {
      email,
      password,
    }, {
      withCredentials: true, // Send credentials with the request
    });

    console.log(response.data);

    // Extract tokens from the response
    const refreshToken = response.data['refresh-token'];
    const accessToken = response.data['access-token'];
    
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    
    // Store the tokens in cookies
    Cookies.set('accessToken', accessToken, {
      expires: 1,          // Cookie expiration in days (1 day)
      path: '/',           // Available across the entire site
      sameSite: 'Lax',     // Prevent CSRF attacks
      secure: true,        // Set to true if using HTTPS
    });

    Cookies.set('refreshToken', refreshToken, {
      expires: 7,          // Refresh tokens typically last longer (e.g., 7 days)
      path: '/',
      sameSite: 'Lax',
      secure: true,        // Set to true if using HTTPS
    });

    console.log("Tokens saved as cookies", Cookies.get('accessToken'));

    // Check if user details exist using the access token
    const resp = await axios.get('http://127.0.0.1:8000/users/has-user-details/', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    console.log(resp.data.exists);

    // Navigate based on the existence of user details
    if (resp.data.exists) {
      navigate("/homepage");
    } else {
      navigate(`/user-details`);
    }
    
  } catch (error) {
    alert("Invalid credentials!!")
    // Handle login errors (e.g., invalid credentials)
    console.error('Error during login:', error);
    // Optionally alert the user about invalid credentials
    // alert("Invalid credentials!!!");
  }
};

export default handleLogin;
