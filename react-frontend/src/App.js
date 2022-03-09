import './App.scss';
import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState(1)
  const [client, setClient] = useState(new W3CWebSocket('ws://localhost:8000/ws/chat/' + room + '/'))

  const logIn = (e) => {
    if (isLoggedIn === false) {
      e.preventDefault()
      setIsLoggedIn(true)
    }
  }
  
  function onClick(e) {
    e.preventDefault()
    client.send(JSON.stringify({
      type: 'message',
      message: inputValue,
      username: username
    }))
    e.target.value = inputValue
    setInputValue('')
  }

  useEffect(() => {
    client.onopen = async () => {
      console.log('WebSocket Client Connected')
      let res = await axios.get("http://localhost:8000/api/messages")
      setMessages(res.data)
    }
  }, [])

  useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      console.log('got reply!', dataFromServer)
      if (dataFromServer) {
        setMessages([...messages, { message: dataFromServer.message, username: dataFromServer.username }])
      }
    }
  }, [messages.length])

  return (
    <div className="App">
      <h1>Home</h1>
      {isLoggedIn ?
        <div className='App-chatroom'>
          <div className='App-chatroom-user'>
            <p>Room Name: {room}</p>
            <div className='App-chatroom-input'>
              {messages.map(message => <>
                <p>User: {message.username}</p>
                <p>Message: {message.message}</p>
              </>)}
            </div>
          </div>
          <form noValidate onSubmit={onClick}>
            <input id="text-input" placeholder='Make a comment' value={inputValue} onChange={e => {
              setInputValue(e.target.value)
  
            }} />
            <button type='submit'>Send Chat</button>
          </form>
        </div>
        :
        <div className='App-login'>
          <h1>HOCs Nest</h1>
          <form noValidate onSubmit={logIn}>
            <input id='room-name' placeholder='Chatroom Name' name='chatroom-name' value={room} onChange={e => {
              setRoom(e.target.value)
            }} />
            <input id='username' placeholder='Username' name='username' value={username} onChange={e => {
              setUsername(e.target.value)
            }} />
            <button type='submit'>Start Chatting</button>
          </form>
        </div>
      }
    </div>
  );
}

export default App;
