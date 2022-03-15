import './Login.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';
import axiosConnection from './authAPI';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const logIn = (e) => {
        e.preventDefault();

        axiosConnection
            .post(`token/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosConnection.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                navigate('/chat');
            });
    };


    return (
        <div className="user-container">
            <div className='login'>
                <div className='login-container'>
                    <div className='row'>
                        <div className='col login-header'>
                            <h2 className='login-header-title'>HOCs Nest</h2>
                            <p className='login-header-subtitle'>A simple, real-time chat application</p>
                            <img className='login-header-logo' src='https://i.imgur.com/W7mI5kZ.png' alt='HOCs Nest Logo' />
                        </div>
                        <div className='col login-form'>
                            <form onSubmit={logIn} noValidate>
                                <h3 className='login-form-title'>Login</h3>
                                <div className='form-group'>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                    <div className='login-form-forgot'>
                                        <Link to='/' className=''>Forgot password?</Link>
                                    </div>
                                </div>
                                <button type='submit' className='btn login-form-btn'>Submit</button>
                            </form>
                            <div className='login-form-create'>
                                <Link to='/signup' className=''>Don't have an account? <span>Sign up</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
