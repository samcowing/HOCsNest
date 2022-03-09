import './Login.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';

const Login = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onClick = async (e) => {
        e.preventDefault()
        const client = new W3CWebSocket('ws://localhost:8000/ws/')

        const formData = new FormData()
        formData.set("username", username)
        formData.set("password", password)

        const registration = await axios({
            method: "POST",
            url: `${client}/auth/users`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" }
            }
        }).catch(function (error) {
            alert('Error ' + error.message);
        })

        const authorization = await axios({
            method: "POST",
            url: `${client}/auth/token/login/`,
            data: formData,
            config: {
                headers: { "Content-Type": "multipart/form-data" }
            }
        }).catch(function (error) {
            alert('Error ' + error.message);
        })

        localStorage.setItem("token", authorization.data.stream_token);
    }

    return (
        <div className="login">
            <div className='login-container'>
                <div className='row'>
                    <div className='col login-header'>
                        <h2 className='login-header-title'>HOCs Nest</h2>
                        <p className='login-header-subtitle'>A simple, real-time chat application</p>
                        <img className='login-header-logo' src='https://i.imgur.com/W7mI5kZ.png' alt='HOCs Nest Logo' />
                    </div>
                    <div className='col login-form'>
                        <form onSubmit={onClick} action='POST'>
                            <h3 className='login-form-title'>Login</h3>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={(e) => { setUsername(e.target.value) }}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <br />
                                <Link to='/' className='login-form-forgot'>Forgot password?</Link>
                            </div>
                            <button type='submit' className='btn'>Submit</button>
                        </form>
                        <Link to='/signup' className='login-form-create'>Don't have an account? Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login