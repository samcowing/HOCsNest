import './App.scss';
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  // const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState(1)

  const client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + room + '/')

  const logIn = (e) => {
    if (isLoggedIn === false) {
      e.preventDefault()
      setIsLoggedIn(true)
      console.log(username)
      console.log(room)
    }
  }

  const onClick = (e) => {
    client.send(JSON.stringify({
      type: 'message',
      message: e.target.value,
      username: e.target.name
      // setUsername(e.target.name)
    }))
    // e.target.value = ''
    console.log(e.target)
    setInputValue('')
    e.target.value = inputValue
    e.preventDefault()
    console.log(username)
    console.log(room)
  }

  useLayoutEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      console.log('got reply!', dataFromServer)
      if (dataFromServer) {
        setMessages([...messages, { msg: dataFromServer.message, username: dataFromServer.username }])
        console.log(messages)
      }
    }
  }, [])

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
                <p>Message: {message.msg}</p>
              </>)}
            </div>
          </div>

          <form noValidate onSubmit={onClick}>
            <input id="text-input" placeholder='Make a comment' value={inputValue} onChange={e => {
              setInputValue(e.target.value)
              e.target.value = inputValue
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
              // e.target.value = room
            }} />
            <input id='username' placeholder='Username' name='username' value={username} onChange={e => {
              setUsername(e.target.value)
              // e.target.value = username
            }} />
            <button type='submit'>Start Chatting</button>
          </form>
        </div>
      }
    </div>
  );
}

export default App;
