import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const router = express.Router();


// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashpassword,
        });

        await newUser.save();
        return res.json({ status: true, message: "Record registered" });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User is not registered" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });  // 1-hour expiration
        return res.json({ status: true, message: "Login Successfully" });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Route to add points to a user's score
router.post('/add-points', async (req, res) => {
    const { email, points } = req.body;

    // Validate points value
    if (!Number.isInteger(points) || points <= 0) {
        return res.status(400).json({ message: "Invalid points value. It should be a positive integer." });
    }

    try {
        // Ensure user exists before updating points
        const user = await User.findOneAndUpdate(
            { email },
            { $inc: { points: points } },  // Increment points by the provided value
            { new: true }  // Return the updated user document
        );

        if (user) {
            console.log("User updated:", user);  // Log the updated user
            res.status(200).json({ message: 'Points updated successfully', user });
        } else {
            console.log("User not found");
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating points:', error);
        res.status(500).json({ message: 'Failed to update points', error: error.message });
    }
});

// Route to get leaderboard data
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ points: -1 }).select('username points').limit(10);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch leaderboard", error: err.message });
    }
});


export { router as UserRouter };
