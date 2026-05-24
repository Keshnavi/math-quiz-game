import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';

dotenv.config();  // Load environment variables from the .env file

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,  // Allow cookies to be sent along with the request
}));
app.use(cookieParser());

// Enable preflight requests for all routes
app.options('*', cors());  // Allow preflight requests

// Use your user routes
app.use('/auth', UserRouter);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 5000;  // Use PORT from .env or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
