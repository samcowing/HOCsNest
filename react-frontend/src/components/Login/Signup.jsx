import './Login.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';
import axiosConnection from './authAPI';
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()

    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();

        axiosConnection
            .post(`user/register/`, {
                email: formData.email,
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                navigate('/login');
            });
    }

    return (
        <div className="user-container-signup">
            <div className='signup'>
                <div className='signup-container'>
                    <div className='row'>
                        <div className='col signup-header'>
                            <h2 className='signup-header-title'>HOCs Nest</h2>
                            <p className='signup-header-subtitle'>A simple, real-time chat application</p>
                            <img className='signup-header-logo' src='https://i.imgur.com/W7mI5kZ.png' alt='HOCs Nest Logo' />
                        </div>
                        <div className='col signup-form'>
                            <form onSubmit={handleSignup} noValidate>
                                <h3 className='signup-form-title'>Create Account</h3>
                                <div className='form-group'>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type='submit' className='btn signup-form-btn'>Submit</button>
                            </form>
                            <div className='signup-form-login'>
                                <Link to='/login' className=''>Already have an account? <span>Login</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup
