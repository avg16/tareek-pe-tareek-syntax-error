import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../../../utilities/navbar-main';
import Cookies from 'js-cookie';

const AddFantasy = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const navigate = useNavigate(); // Hook to navigate between pages

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fantasyData = {
            title,
            description,
            anonymous,
        };

        try {
            await axios.post('http://127.0.0.1:8000/fantasies/create-new-fantasy/', fantasyData, {
                withCredentials: true,
                headers:{
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            navigate('/fantasy'); // Redirect to the Fantasy Page after adding
        } catch (error) {
            console.error('Error creating fantasy:', error);
        }
    };

    return (<>
    <Navbar />
        <div className="container mx-auto mt-6">
            <h1 className="text-2xl font-bold mb-4">Add New Fantasy</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                            className="mr-2"
                        />
                        Anonymous
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                >
                    Create Fantasy
                </button>
            </form>
        </div>
        </>
    );
};

export default AddFantasy;
