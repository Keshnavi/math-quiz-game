import React, { useState } from 'react';
import '../App.css';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/background.jpg';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/auth/login", { 
            email, 
            password,
        }).then(response => {
            if(response.data.status) {
                // Assuming response.data.user contains the user data
                localStorage.setItem('userData', JSON.stringify(response.data.user)); // Store user data in localStorage
                navigate('/home');
            }
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className='sign-up-container'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        autoComplete='off'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder='******'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>Login</button>
                    <p>Don't Have an Account? <Link to="/signup">Sign Up</Link> </p> 
                </form>
            </div>
        </div>
    );
};

export default Login;
