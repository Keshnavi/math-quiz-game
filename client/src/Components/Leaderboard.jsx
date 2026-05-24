import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Leaderboard.css"; // Assuming this CSS file contains your styles
import backgroundImage from "../assets/gameback.jpg";
import Confetti from "react-confetti";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/auth/leaderboard", { withCredentials: true });
      setLeaderboard(response.data);
      setShowConfetti(true); // Show confetti
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
      setError("Unable to load the leaderboard. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/home"); // Redirect to the home page
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <div className="leaderboard-container">
        {showConfetti && <Confetti />}
        <h2 className="leaderboard-title">Leaderboard</h2>

        {isLoading ? (
          <div className="loading">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="back-button" onClick={handleBackClick}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
