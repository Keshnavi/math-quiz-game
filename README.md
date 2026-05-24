# Math Quiz Game 🎯

A full-stack math quiz web application with multiple difficulty levels, a real-time leaderboard, and secure user authentication. Built with React, Node.js, Express, and MongoDB.

---

## Features

- **Multiple difficulty levels** — Easy, Medium, and Hard modes with dynamic question fetching
- **Per-question countdown timer** — adds challenge and keeps players engaged
- **Real-time leaderboard** — ranks all players dynamically after each game session
- **User authentication** — secure login and registration with persistent score history
- **Personalised profiles** — each user's score history is saved across sessions
- **Responsive UI** — works across desktop and mobile screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, HTML5, CSS3 |
| Backend | Node.js, Express |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| External API | Banana API (question fetching) |

---

## Project Structure

```
math-quiz-game/
├── client/       # React frontend
├── server/       # Node.js + Express backend
├── package.json
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

The app will be running at `http://localhost:3000`

> **Note:** Create a `.env` file in the server folder with your MongoDB connection string and JWT secret:
> ```
> MONGO_URI=your_mongodb_connection_string
> JWT_SECRET=your_jwt_secret
> ```

---
