import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/homeback.jpg';


function Home() {
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // If not logged in, redirect to the login page
    navigate('/login');
  }

  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="Quiz Logo" className="logo" />
        </div>
      </div>

      {/* Container for both buttons */}
      <div className="button-container">
        <button className="play-button">
          <Link to="/game">Start Game</Link>
        </button>
        <button className="leaderboard-button" onClick={() => navigate('/leaderboard')}>
          Leaderboard
        </button>
      </div>

      <button className="logout-button">
        <Link to="/">Logout</Link>
      </button>
    </div>
  );
}

export default Home;
