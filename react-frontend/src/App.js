import './App.scss';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TempChat from './components/TempChat';
import Login from './components/Login';


function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path='/login-signup' element={< Login />} />
        < Route path='/chat' element={< TempChat />} />
      </Routes>
    </div>
  );
}

export default App;
