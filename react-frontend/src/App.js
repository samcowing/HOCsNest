import './App.scss';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Logout from './components/Login/Logout';


function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path='/signup' element={< Signup />} />
        <Route path='/login' element={< Login />} />
        <Route path="/logout" element={< Logout />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
