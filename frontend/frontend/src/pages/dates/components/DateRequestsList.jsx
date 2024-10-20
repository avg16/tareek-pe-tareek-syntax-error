// src/components/DateRequestsList.jsx
import React from 'react';

const DateRequestsList = ({ dateRequests }) => {
  return (
    <div className="space-y-4">
      {dateRequests.length === 0 ? (
        <div className="text-center text-gray-500">No date requests found.</div>
      ) : (
        dateRequests.map((request) => (
          <div key={request.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="font-bold text-lg">{request.proposed}</h2>
            <p className="text-gray-600">{request.description}</p>
            <p className="text-gray-500">Requested Time: {new Date(request.time).toLocaleString()}</p>
            <p className="text-gray-500">Unique Name: {request.unique_name}</p>
            <p className={`mt-2 font-semibold text-black`}>
              Status: {request.status === 'not_answered' ? 'Not Answered' : (request.status === 'answered' ? 'Answered' : 'Rejected')}
            </p>
            <button
              onClick={() => console.log(`Viewing request: ${request.id}`)} // Replace with actual view logic
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              View Request
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default DateRequestsList;
