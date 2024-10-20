import React from 'react';

const AnsweredDateRequestsList = ({ answeredRequests }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {answeredRequests.length === 0 ? (
        <div className="text-center text-gray-500">No answered date requests found.</div>
      ) : (
        <ul className="space-y-4">
          {answeredRequests.map((request) => (
            <li key={request.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105">
              <p className="font-bold text-lg"><strong>User asked:- </strong> {request.proposed}</p>
              <p className="text-gray-600"><strong>Description:</strong> {request.description}</p>
              Status: {request.status === 'not_answered' ? 'Not Answered' : (request.status === 'answered' ? 'Accepted' : 'Rejected')}
              <p className="text-gray-500"><strong>Time:</strong> {new Date(request.time).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnsweredDateRequestsList;
