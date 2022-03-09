import './App.scss';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Test from './components/Test';
import Login from './components/Login';


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/test' element={<Test />} />
            </Routes>
        </div>
    );
}

export default App;
