import './Login.scss'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';

const Login = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const logIn = async (e) => {
        e.preventDefault()
        setIsLoading(true, () => {
            const base = "http://localhost:8000"

            const formData = new FormData()
            formData.set("username", username)
            formData.set("password", password)

            const authorization = axios({
                method: "POST",
                url: `${base}/auth/token/login/`,
                data: formData,
                config: {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            }).catch(function (error) {
                alert('Error ' + error.message)
            })

            localStorage.setItem("token", authorization.data.stream_token)
            localStorage.setItem("username", username)
        })
        setIsLoading(false)
    }

    const signUp = async (e) => {
        e.preventDefault()
        setIsLoading(true, () => {
            const base = "http://localhost:8000"

            const formData = new FormData()
            formData.set("email", email)
            formData.set("username", username)
            formData.set("password", password)

            const registration = axios({
                method: "POST",
                url: `${base}/auth/users`,
                data: formData,
                config: {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            }).catch(function (error) {
                alert('Error ' + error.message)
            })

            const authorization = axios({
                method: "POST",
                url: `${base}/auth/token/login/`,
                data: formData,
                config: {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            }).catch(function (error) {
                alert('Error ' + error.message)
            })

            localStorage.setItem("token", authorization.data.stream_token)
            localStorage.setItem("username", username)
        })
        setIsLoading(false)
    }

    const loginSignup = (e) => {
        e.preventDefault()
        if (loggedIn) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }

    return (
        <div className="user-container">
            {/* LOGIN */}
            {loggedIn ?
                <div className='login'>
                    <div className='login-container'>
                        <div className='row'>
                            <div className='col login-header'>
                                <h2 className='login-header-title'>HOCs Nest</h2>
                                <p className='login-header-subtitle'>A simple, real-time chat application</p>
                                <img className='login-header-logo' src='https://i.imgur.com/W7mI5kZ.png' alt='HOCs Nest Logo' />
                            </div>
                            <div className='col login-form'>
                                <form onSubmit={logIn} action='POST'>
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
                                        <div className='login-form-forgot'>
                                            <Link to='/' className=''>Forgot password?</Link>
                                        </div>
                                    </div>
                                    <button type='submit' className='btn login-form-btn'>Submit</button>
                                </form>
                                <div className='login-form-create'>
                                    <Link to='#' className='' onClick={loginSignup}>Don't have an account? <span>Sign up</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                /* SIGNUP */
                :
                <div className='signup'>
                    <div className='signup-container'>
                        <div className='row'>
                            <div className='col signup-header'>
                                <h2 className='signup-header-title'>HOCs Nest</h2>
                                <p className='signup-header-subtitle'>A simple, real-time chat application</p>
                                <img className='signup-header-logo' src='https://i.imgur.com/Sycy4y3.png' alt='HOCs Nest Logo' />
                            </div>
                            <div className='col signup-form'>
                                <form onSubmit={signUp} action='POST'>
                                    <h3 className='signup-form-title'>Create Account</h3>
                                    <div className='form-group'>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
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
                                        <div className='signup-form-forgot'>
                                        </div>
                                    </div>
                                    <button type='submit' className='btn signup-form-btn'>Submit</button>
                                </form>
                                <div className='signup-form-login'>
                                    <Link to='/signup' className='' onClick={loginSignup}>Already have an account? <span>Login</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login