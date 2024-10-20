import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
const DateRequestForm = ({ username, onClose }) => {
  const [message, setMessage] = useState('');
  const [venue, setVenue] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = 
    {
        "proposed": username,
        time: dateTime,
        venue: venue,
        description: description
    }
    console.log(data)
    try {
      const response = await axios.post('http://127.0.0.1:8000/dating/ask-for-a-date/', data,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
        
      });
      alert('Date request sent successfully!');
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error sending date request:', error);
      alert('Failed to send date request.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Ask {username} for a Date</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Venue</label>
            <input
              type="text"
              placeholder="Enter venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              rows="4"
              placeholder="Enter a brief description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 rounded px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-500 text-white rounded px-4 py-2 hover:bg-pink-600"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateRequestForm;
