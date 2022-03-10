import './App.scss';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';


function App() {

  return (
    <div className="App" >
      <Routes>
        <Route path='/login-signup' element={< Login />} />
        < Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
