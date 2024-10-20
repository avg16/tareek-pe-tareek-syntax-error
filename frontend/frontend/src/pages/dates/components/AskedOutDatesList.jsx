import React from 'react';
import axios from 'axios'; // Import Axios for making API requests
import Cookies from 'js-cookie'; // To get the access token from cookies

const AskedOutDatesList = ({ askedOutDates, setAskedOutDates }) => {
  const handleResponse = async (unique_name, response) => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/dating/respond/',
        {
          unique_name,
          response, // 'accepted' or 'rejected'
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`, // JWT Token for authorization
          },
        }
      );
      
      if (res.status === 200) {
        console.log('Response sent successfully:', res.data);
        window.location.reload();
        
        // Optionally, update the status of the particular date in the frontend
        const updatedDates = askedOutDates.map((askedOut) => {
          if (askedOut.unique_name === unique_name) {
            return { ...askedOut, status: response === 'accepted' ? 'accepted' : 'rejected' };
          }
          return askedOut;
        });

        setAskedOutDates(updatedDates); // Update the state with the new statuses

        // Reload the page to refresh details
         // Refresh the page to get the latest data
      }
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  return (
    <div className="space-y-4">
      {askedOutDates.length === 0 ? (
        <div className="text-center text-gray-500">No dates asked out found.</div>
      ) : (
        askedOutDates.map((askedOut) => (
          <div key={askedOut.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="font-bold text-lg">{askedOut.proposed}</h2>
            <p className="text-gray-600">{askedOut.description}</p>
            <p className="text-gray-500">Asked Out Time: {new Date(askedOut.time).toLocaleString()}</p>
            <p className="text-gray-500">Unique Name: {askedOut.unique_name}</p>
            <p className={`mt-2 font-semibold text-black`}>
              Status: {askedOut.status === 'not_answered' ? 'Not Answered' : (askedOut.status === 'answered' ? 'Accepted' : 'Rejected')}
            </p>
            
            {/* Accept Button */}
            <button
              onClick={() => handleResponse(askedOut.unique_name, 'accepted')}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              disabled={askedOut.status !== 'not_answered'} // Disable the button if already answered
            >
              Accept
            </button>
            
            {/* Decline Button */}
            <button
              onClick={() => handleResponse(askedOut.unique_name, 'rejected')}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ml-2"
              disabled={askedOut.status !== 'not_answered'} // Disable the button if already answered
            >
              Decline
            </button>

            <button
              onClick={() => console.log(`Viewing asked out request: ${askedOut.id}`)} // Replace with actual view logic
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ml-2"
            >
              View Request
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AskedOutDatesList;
