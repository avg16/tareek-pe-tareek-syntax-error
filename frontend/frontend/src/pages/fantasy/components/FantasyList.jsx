import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FantasyList = () => {
    const [fantasies, setFantasies] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch both fantasies and user details
        const fetchData = async () => {
            try {
                const [fantasiesResponse, userDetailsResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/fantasies/fantasies/', { withCredentials: true }),
                    axios.get('http://127.0.0.1:8000/users/get-user-details/', { 
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        },
                    }),
                ]);

                setFantasies(fantasiesResponse.data);
                setUserDetails(userDetailsResponse.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Delete a fantasy
    const handleDelete = async (unique_name) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/fantasies/delete-fantasy/${unique_name}/`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            });
            // Remove deleted fantasy from state
            setFantasies(fantasies.filter(fantasy => fantasy.unique_name !== unique_name));
        } catch (err) {
            console.error("Error deleting fantasy:", err);
            alert("Failed to delete the fantasy.");
        }
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">Error: {error.message}</p>;

    return (
        <div className="container mx-auto mt-6">
            {/* Display user details */}
            {/* {userDetails && (
                <div className="mb-4 p-4 border rounded bg-gray-100">
                    <h2 className="text-xl">Welcome, {userDetails.username}</h2>
                    <p className="text-gray-600">Email: {userDetails.email}</p>
                </div>
            )} */}

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fantasies.map((fantasy) => (
                    <div 
                        key={fantasy.unique_name} 
                        className="p-4 border border-gray-300 rounded shadow-md bg-white transition transform hover:scale-105 hover:shadow-lg"
                    >
                        <h2 className="text-xl font-semibold">{fantasy.title}</h2>
                        <p className="mt-2 text-gray-600">{fantasy.description}</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Username: {fantasy.anonymous ? 'Anonymous' : fantasy.username}
                        </p>
                        {/* Show delete button only if the user is the owner */}
                        {userDetails && fantasy.username === userDetails.username && (
                            <button
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleDelete(fantasy.unique_name)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FantasyList;
