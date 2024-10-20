import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../../utilities/navbar-main'; // Adjust the import path as necessary
import FantasyList from './components/FantasyList'; // Adjust the import path as necessary

const FantasyPage = () => {
    const navigate = useNavigate(); // Hook to navigate between pages

    const handleAddFantasy = () => {
        navigate('add-fantasy'); // Navigate to the Add Fantasy page
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-2xl font-bold">Fantasy List</h1>
                <button
                    onClick={handleAddFantasy}
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-500"
                >
                    Add Fantasy
                </button>
            </div>
            <FantasyList />
        </div>
    );
};

export default FantasyPage;
