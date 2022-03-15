import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConnection from './authAPI';

const Logout = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const response = axiosConnection.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		})
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		axiosConnection.defaults.headers['Authorization'] = null
		navigate('/login');
	})
	return <div>Logout</div>
}

export default Logout
