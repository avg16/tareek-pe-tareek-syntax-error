// src/pages/DateRequestsPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../utilities/navbar-main';
import Cookies from 'js-cookie';
import axios from 'axios';
import AskedOutDatesList from './components/AskedOutDatesList';
import DateRequestsList from './components/DateRequestsList';
import AnsweredDateRequestsList from './components/AskedOutResult';

const DateRequestsPage = () => {
  const [dateRequests, setDateRequests] = useState([]);
  const [askedOutDates, setAskedOutDates] = useState([]); 
  const [answeredRequests, setAnsweredRequests] = useState([]); // New state for answered requests
  const [error, setError] = useState(null);

  const fetchDateRequests = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/dating/user-dates-requests/', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      const data = response.data;
      setDateRequests(data.date_requests || []); 
    } catch (err) {
      setError(err.message);
      console.error('Error fetching date requests:', err);
    }
  };

  const fetchAskedOutDates = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/dating/user-asked-out-dates/', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      const data = response.data;
      setAskedOutDates(data.date_requests || []); 
    } catch (err) {
      setError(err.message);
      console.error('Error fetching asked out dates:', err);
    }
  };

  const fetchAnsweredRequests = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/dating/user-dates-requests-answered/', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      const data = response.data;
      console.log(data)
      setAnsweredRequests(data.date_requests || []); // Set answered date requests
    } catch (err) {
      setError(err.message);
      console.error('Error fetching answered date requests:', err);
    }
  };

  useEffect(() => {
    fetchDateRequests();
    fetchAskedOutDates(); 
    fetchAnsweredRequests(); // Fetch answered date requests
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">My Date Requests</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Date Requests Section */}
        <DateRequestsList dateRequests={dateRequests} />

        {/* Dates Asked Out For Section */}
        <h1 className="text-2xl font-bold mt-8 mb-4 text-center">Dates Asked Out For</h1>
        <AskedOutDatesList askedOutDates={askedOutDates} />

        {/* Answered Date Requests Section */}
        <h1 className="text-2xl font-bold mt-8 mb-4 text-center">Answered Date Requests</h1>
        <AnsweredDateRequestsList answeredRequests={answeredRequests} />
      </div>
    </div>
  );
};

export default DateRequestsPage;
