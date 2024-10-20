import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import UserDetailsPage from './pages/UserDetails/UserDetailsPage';
import UserProfile from './pages/Homepage';
import RegisterPage from './pages/auth/RegisterPage';
import AllUsersPage from './pages/users/AllUsersPage';
import EditUserDetailsPage from './pages/UserDetails/EditProfilepage';
import DateRequestsPage from './pages/dates/UserDates';
import ChatPage from './pages/chat/ChatPage';
import RecommendUsersPage from './pages/recommend/RecommendPage';
import FantasyList from './pages/fantasy/components/FantasyList';
import FantasyPage from './pages/fantasy/FantasyPage';
import AddFantasy from './pages/fantasy/add/AddFantasy';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold">Hello</h1>} />
          <Route path="/homepage" element={<UserProfile/>} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/edit-profile" element={<EditUserDetailsPage/>} />
          <Route path="/users" element={<AllUsersPage />} />
          <Route path="/fantasy" element = {<FantasyPage/>} />
          <Route path="/fantasy/add-fantasy" element = {<AddFantasy/>} />
          <Route path="/dates" element = {<DateRequestsPage/>} />
          <Route path="/chat/:username1/:username2" element={<ChatPage />} />
          <Route path="/recomendations" element={<RecommendUsersPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;