import './App.scss';
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Logout from './components/Login/Logout';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

import { ThemeProvider } from 'styled-components'
import { useDarkMode } from './useDarkMode';
import { lightTheme, darkTheme } from './theme'
import { GlobalStyles } from './globalStyles'


function App() {

  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="App" >
        <div>
          <Routes>
            <Route path='/signup' element={< Signup />} />
            <Route path='/login' element={< Login />} />
            <Route path="/logout" element={< Logout />} />
            <Route path='/chat' element={<Chat theme={theme} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
