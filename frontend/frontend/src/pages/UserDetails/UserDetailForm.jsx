import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const CreateUserDetailsForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    superhero_name: "",
    preferred_age_range: "18-25",
    sexuality: "",
    gender: "",
    city: "",
    pincode: "",
    education_level: "High School",
    preferred_occupation_1: "",
    preferred_occupation_2: "",
    preferred_occupation_3: "",
    income_level: "",
    curiosity_level: 5,
    organized_chaos: 5,
    social_butterfly: 5,
    team_player_vibes: 5,
    chill_factor: 5,
    adventure_seeker: 5,
    perfectionist_mode: 5,
    party_starter: 5,
    harmony_seeker: 5,
    mood_meter: 5,
    haveDated: null,
    dating_status: "single",
    hobby_1: "",
    hobby_2: "",
    hobby_3: "",
    movie_preference_1: "",
    movie_preference_2: "",
    movie_preference_3: "",
    song_preference_1: "",
    song_preference_2: "",
    song_preference_3: "",
    celebrity_crush: "",
    favorite_webseries: "",
    dietary_preferences: "",
    pet_preferences: "",
    fitness_preferences: "",
    smoking_habits: "",
    alcohol_consumption: "",
    hogwarts_house: "Gryffindor",
    ldr_willingness: false,
    profile_picture: null// Added for the profile picture
  });

  const handleChange = (e) => {
    console.log(formData);
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  const handleSliderChange = (preference, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [preference]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Prepare the form data for submission
    const userData = new FormData();
    for (const key in formData) {
      userData.append(key, formData[key]);
    }
      console.log(formData);

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/create-user-details/", userData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
          "Content-Type": "multipart/form-data" // Necessary for file uploads
        }
      });
      console.log(response.data);
      if (response.data.message) {
        alert("UserDetails created successfully!");
        navigate("/homepage")
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating user details.");
    }
  };


  return (
    
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Name Fields */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {/* location */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {/* pincode */}
      <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {/* celebrity crush*/}
      <div>
        <label htmlFor="celebrity_crush" className="block text-sm font-medium text-gray-700">Celebrity Crush</label>
        <input
          type="text"
          id="celebrity_crush"
          name="celebrity_crush"
          value={formData.celebrity_crush}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {/* Profile Picture */}

      <div>
        <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input
          type="file"
          id="profile_picture"
          name="profile_picture"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="superhero_name" className="block text-sm font-medium text-gray-700">Superhero Name</label>
        <input
          type="text"
          id="superhero_name"
          name="superhero_name"
          value={formData.superhero_name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {/* LDR Willingness */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Are you willing to engage in a long-distance relationship?</label>
        <input
          type="checkbox"
          name="ldr_willingness"
          checked={formData.ldr_willingness}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      {/* Have dated */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Have you dated before?</label>
        <input
          type="checkbox"
          name="have dated"
          checked={formData.haveDated}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      {/* Dating status */}
      <div>
        <label htmlFor="preferred_occupation_1" className="block text-sm font-medium text-gray-700">Dating status</label>
        <select
          id="dating_status"
          name="dating_status"
          value={formData.dating_status}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select option</option>
          <option value="single">single</option>
          <option value="taken">taken</option>
         
        </select>
      </div>

      {/* Education level */}
      <div>
        <label htmlFor="education_level" className="block text-sm font-medium text-gray-700">Education level</label>
        <select
          id="education_level"
          name="education_level"
          value={formData.education_level}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select education</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="Doctorate">Doctorate</option>
         
        </select>
      </div>
      

      {/* Preferred Occupations */}
      <div>
        <label htmlFor="preferred_occupation_1" className="block text-sm font-medium text-gray-700">Preferred Occupation 1</label>
        <select
          id="preferred_occupation_1"
          name="preferred_occupation_1"
          value={formData.preferred_occupation_1}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Occupation</option>
          <option value="Creative">Creative</option>
          <option value="Technical">Technical</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Service">Service</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferred_occupation_2" className="block text-sm font-medium text-gray-700">Preferred Occupation 2</label>
        <select
          id="preferred_occupation_2"
          name="preferred_occupation_2"
          value={formData.preferred_occupation_2}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Occupation</option>
          <option value="Creative">Creative</option>
          <option value="Technical">Technical</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Service">Service</option>
        </select>
      </div>
      <div>
        <label htmlFor="preferred_occupation_3" className="block text-sm font-medium text-gray-700">Preferred Occupation 3</label>
        <select
          id="preferred_occupation_3"
          name="preferred_occupation_3"
          value={formData.preferred_occupation_3}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Occupation</option>
          <option value="Creative">Creative</option>
          <option value="Technical">Technical</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Service">Service</option>
        </select>
      </div>


      {/* hobby status */}
      <div>
        <label htmlFor="hobby_1" className="block text-sm font-medium text-gray-700">Hobby 1</label>
        <select
          id="hobby_1"
          name="hobby_1"
          value={formData.hobby_1}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Hobby</option>
          <option value="Outdoor Activites">Outdoor Activites</option>
          <option value="Artisitic hobbies">Artisitic hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
        </select>
      </div>

      <div>
        <label htmlFor="hobby_2" className="block text-sm font-medium text-gray-700">Hobby 2</label>
        <select
          id="hobby_2"
          name="hobby_2"
          value={formData.hobby_2}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
           <option value="" disabled>Select Hobby</option>
          <option value="Outdoor Activites">Outdoor Activites</option>
          <option value="Artisitic hobbies">Artisitic hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      <div>
        <label htmlFor="hobby_3" className="block text-sm font-medium text-gray-700">Hobby 3</label>
        <select
          id="hobby_3"
          name="hobby_3"
          value={formData.hobby_3}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
           <option value="" disabled>Select Hobby</option>
          <option value="Outdoor Activites">Outdoor Activites</option>
          <option value="Artisitic hobbies">Artisitic hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
      {/* Gender Selection */}
<div>
  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
  <select
    id="gender"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>

{/* Age Selection */}
<div>
  <label htmlFor="preferred_age_range" className="block text-sm font-medium text-gray-700">Preferred Age Range</label>
  <select
    type="preferred_age_range"
    id="preferred_age_range"
    name="preferred_age_range"
    value={formData.preferred_age_range}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  > 
   <option valiue="age" disabled> Select Age Range</option>
    <option value="18-25">18-25</option>
    <option value="25-30">25-30</option>
    <option value="30-35">30-35</option>
    <option value="35-40">35-40</option>
    <option value="40-45">40-45</option>
    <option value="45+">45+</option>

  </select>
</div>

{/* Sexuality Selection */}
<div>
  <label htmlFor="sexuality" className="block text-sm font-medium text-gray-700">Sexuality</label>
  <select
    id="sexuality"
    name="sexuality"
    value={formData.sexuality}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  >
    <option value="">Select Sexuality</option>
    <option value="Straight">Straight</option>
    <option value="Gay">Gay</option>
    <option value="Bisexual">Bisexual</option>
    <option value="Lesbian">Lesbian</option>
  </select>
</div>

{/* Income Level */}
<div>
  <label htmlFor="income_level" className="block text-sm font-medium text-gray-700">Income Level</label>
  <select
    id="income_level"
    name="income_level"
    value={formData.income_level}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  >
    <option value="">Select Income Level</option>
    <option value="Low income">Less than 5,00,000 Rs</option>
    <option value="Middle income">5,00,000 - 20,00,000 Rs</option>
    <option value="Upper-middle income">20,00,000 - 50,00,000 Rs</option>
    <option value="High income">More than 50,00,000 Rs</option>
  </select>
</div>

{/* Song Preferences */}
<div>
  <label htmlFor="song_preference_1" className="block text-sm font-medium text-gray-700">Song Preference 1</label>
  <select
    type="text"
    id="song_preference_1"
    name="song_preference_1"
    value={formData.song_preference_1}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  > 
   <option valiue="age" disabled> Select Song</option>
       <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Classical">Classical</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Country">Country</option>
        <option value="Electronic">Electronic</option>
        <option value="Indie">Indie</option>
  </select>
</div>
<div>
  <label htmlFor="song_preference_2" className="block text-sm font-medium text-gray-700">Song Preference 2</label>
  <select
    type="text"
    id="song_preference_2"
    name="song_preference_2"
    value={formData.song_preference_2}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  >
    <option valiue="age" disabled> Select Song</option>
     <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Classical">Classical</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Country">Country</option>
        <option value="Electronic">Electronic</option>
        <option value="Indie">Indie</option>
    </select>
</div>
<div>
  <label htmlFor="song_preference_1" className="block text-sm font-medium text-gray-700">Song Preference 3</label>
  <select
    type="text"
    id="song_preference_3"
    name="song_preference_3"
    value={formData.song_preference_3}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
    required
  > 
  <option valiue="age" disabled> Select Song</option>
   <option value="Pop">Pop</option>
        <option value="Rock">Rock</option>
        <option value="Classical">Classical</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Country">Country</option>
        <option value="Electronic">Electronic</option>
        <option value="Indie">Indie</option>
        </select>
</div>

    {/* Dietary Preferences */}
    <div>
    <label htmlFor="dietary_preferences" className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
    <select
        id="dietary_preferences"
        name="dietary_preferences"
        value={formData.dietary_preferences}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required
    >
        <option value="">Select Dietary Preference</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Other">Other</option>
    </select>
    </div>
    {/* Pet perferences  */}
    <div>
    <label htmlFor="dietary_preferences" className="block text-sm font-medium text-gray-700">Pet Preferences</label>
    <select
        id="pet_preferences"
        name="pet_preferences"
        value={formData.pet_preferences}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required>
        <option value="">Select Pet preferences</option>
        <option value="Likes pets">Likes pets</option>
        <option value="No pets">No pets</option>
        <option value="Allergic to pets">Allergic to pets</option>
    </select>
    </div>
    {/* Fitness Preferences */}
    <div>
    <label htmlFor="dietary_preferences" className="block text-sm font-medium text-gray-700">Fitness Preferences</label>
    <select
        id="fitness_preferences"
        name="fitness_preferences"
        value={formData.fitness_preferences}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required>
        <option value="">Select Fitness preferences</option>
        <option value="Gym">Gym</option>
        <option value="Running">Running</option>
        <option value="No interest in fitness">No interest in fitness</option>
    </select>
    </div>
   {/* smoking details */}
    <div>
    <label htmlFor="dietary_preferences" className="block text-sm font-medium text-gray-700">Smoking Details</label>
    <select
        id="smoking_habits"
        name="smoking_habits"
        value={formData.smoking_habits}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required>
        <option value="">Select smoking habits</option>
        <option value="Smoker">Smoker</option>
        <option value="Non-smoker">Non smoker</option>
    </select>
    </div>
   {/* alcohol consumption */}
    <div>
    <label htmlFor="dietary_preferences" className="block text-sm font-medium text-gray-700">Alcohol consumption</label>
    <select
        id="alcohol_consumption"
        name="alcohol_consumption"
        value={formData.alcohol_consumption}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required>
        <option value="">Select Drinking habits</option>
        <option value="Drinks regularly">Drinks regularly</option>
        <option value="Occasionally">Occasionally</option>
        <option value="Never">Never</option>
    </select>
    </div>
    


    <div>
    <label htmlFor="hogwarts_house" className="block text-sm font-medium text-gray-700">Hogwarts House</label>
    <select
        id="hogwarts_house"
        name="hogwarts_house"
        value={formData.hogwarts_house}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required>
        <option value="">Select house</option>
        <option value="Gryffindor">Gryffindor</option>
        <option value="Slytherin">Slytherin</option>
        <option value="Hufflepuff">HufflePuff</option>
        <option value="Ravenclaw">Ravenclaw</option>
    </select>
    </div>

    {/* Add similar select fields for:
    - pet_preferences
    - fitness_preferences
    - smoking_habits
    - alcohol_consumption
    */}


      {/* Hobbies */}
      {/* <div>
        <label htmlFor="hobby_1" className="block text-sm font-medium text-gray-700">Hobby 1</label>
        <select
          id="hobby_1"
          name="hobby_1"
          value={formData.hobby_1}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Hobby</option>
          <option value="Outdoor Activities">Outdoor Activities</option>
          <option value="Artistic hobbies">Artistic hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
        </select>
      </div>

      <div>
        <label htmlFor="hobby_2" className="block text-sm font-medium text-gray-700">Hobby 2</label>
        <select
          id="hobby_2"
          name="hobby_2"
          value={formData.hobby_2}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Hobby</option>
          <option value="Outdoor Activities">Outdoor Activities</option>
          <option value="Artistic hobbies">Artistic hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
        </select>
      </div>

      <div>
        <label htmlFor="hobby_3" className="block text-sm font-medium text-gray-700">Hobby 3</label>
        <select
          id="hobby_3"
          name="hobby_3"
          value={formData.hobby_3}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Hobby</option>
          <option value="Outdoor Activities">Outdoor Activities</option>
          <option value="Artistic hobbies">Artistic hobbies</option>
          <option value="Fitness">Fitness</option>
          <option value="Reading">Reading</option>
          <option value="Gaming">Gaming</option>
          <option value="Music">Music</option>
          <option value="Travel">Travel</option>
        </select>
      </div> */}

      {/* Movies */}
      <div>
        <label htmlFor="movie_preference_1" className="block text-sm font-medium text-gray-700">Movie Preference 1</label>
        <select
          type="text"
          id="movie_preference_1"
          name="movie_preference_1"
          value={formData.movie_preference_1}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
        <option value="" disabled>Select Movie Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Documentary">Documentary</option>

        </select>
      </div>

      <div>
        <label htmlFor="movie_preference_2" className="block text-sm font-medium text-gray-700">Movie Preference 2</label>
        <select
          type="text"
          id="movie_preference_2"
          name="movie_preference_2"
          value={formData.movie_preference_2}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        > 
        <option value="" disabled>Select Movie Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Documentary">Documentary</option>
        </select>
      </div>

      <div>
        <label htmlFor="movie_preference_3" className="block text-sm font-medium text-gray-700">Movie Preference 3</label>
        <select
          type="text"
          id="movie_preference_3"
          name="movie_preference_3"
          value={formData.movie_preference_3}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          required
        >
            <option value="" disabled>Select Movie Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Documentary">Documentary</option> </select>
      </div>

      {/* Preferences Slider */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Preferences</h3>
        <div className="space-y-4">
          {[
            "curiosity_level",
            "organized_chaos",
            "social_butterfly",
            "team_player_vibes",
            "chill_factor",
            "adventure_seeker",
            "perfectionist_mode",
            "party_starter",
            "harmony_seeker",
            "mood_meter",
          ].map((preference) => (
            <div key={preference}>
              <label htmlFor={preference} className="block text-sm font-medium text-gray-700">{preference.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</label>
              <input
                type="range"
                id={preference}
                name={preference}
                min="0"
                max="10"
                value={formData[preference]}
                onChange={(e) => handleSliderChange(preference, e.target.value)}
                className="mt-1 w-full"
              />
              <div className="text-sm text-gray-600">Value: {formData[preference]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default CreateUserDetailsForm;
