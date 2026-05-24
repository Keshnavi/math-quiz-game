import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Game.css';

const Game = () => {
  const { timer } = useParams(); // Get timer from the URL
  const navigate = useNavigate();

  const initialTimer = Number(timer);
  const [countdown, setCountdown] = useState(
    !Number.isNaN(initialTimer) && initialTimer > 0 ? initialTimer : 60 // Default to 60 seconds if invalid
  );
  const [points, setPoints] = useState(0); // Points state
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(''); // Popup message state
  const [gameOver, setGameOver] = useState(false); // Game over state

  const apiUrl = 'https://marcconrad.com/uob/banana/api.php';


  const fetchGameData = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (response.data) {
        setGameData(response.data);
      } else {
        setGameData({ message: 'No game data available.' });
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching game data:', error);
      setError('Failed to fetch game data');
      setIsLoading(false);
    }
  };

  const savePointsToDatabase = async () => {
    try {
      // Send the points to the backend
      const response = await axios.post('http://localhost:5000/auth/add-points', { points });
      if (response.status === 200) {
        console.log('Points saved successfully!');
      } else {
        console.error('Failed to save points');
      }
    } catch (error) {
      console.error('Error saving points:', error);
    }
  };
  

  useEffect(() => {
    fetchGameData();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true); // Set game over state
          savePointsToDatabase(); // Save points when game is over
          return 0; // Stop at 0 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === gameData.solution) {
      setPoints((prev) => prev + 10); // Increase points by 10
      setPopupMessage('Correct Answer! 🎉');
      fetchGameData();
    } else {
      setPopupMessage('Wrong Answer! Try again. ❌');
    }
    setTimeout(() => setPopupMessage(''), 2000); // Hide popup after 2 seconds
  };

  if (isLoading) {
    return <div>Loading game data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="game-container">
      {gameOver && (
        <div className="popup">
          <h2>Game Over! 🛑</h2>
          <p>You scored {points} points!</p>
          <button onClick={() => navigate('/home')}>Return to Home</button>
        </div>
      )}

      {!gameOver && (
        <>
          <div className="button-container">
            <button className="back-button" onClick={() => navigate('/home')}>
              Back
            </button>

            <button className="back-button" onClick={() => navigate('/leaderboard')}>
              Leaderboard
            </button>
          </div>

          <p>Time remaining: {countdown} seconds</p>
          <p>Points: {points}</p>

          {popupMessage && <div className="popup">{popupMessage}</div>}

          <div>
            <h3>Question:</h3>
            <img src={gameData.question} alt="Game Question" />
          </div>

          <div className="answers">
            {Array.from({ length: 9 }, (_, i) => (
              <button key={i + 1} onClick={() => handleAnswer(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
