import './Chat.scss'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Avatar from '@mui/material/Avatar'
import { indigo, lightBlue } from '@mui/material/colors'
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import axios from 'axios';

function Chat() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState(null)
  const [client, setClient] = useState({})

  const logIn = async (e) => {
    if (isLoggedIn === false) {
      e.preventDefault()
      setIsLoggedIn(true)
      const new_client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + room + '/')
      setClient(new_client)
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
      const res = await axios.get("http://localhost:8000/api/messages?room=" + room)
      const prevMessages = res.data.map((element) => {
        return {
          message: element.message,
          username: element.user.username
        }
      })
      setMessages(prevMessages)
      console.log(prevMessages)
    }
  }, [client])

  useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      console.log('got reply!', dataFromServer)
      if (dataFromServer) {
        setMessages([...messages, { message: dataFromServer.message, username: dataFromServer.username }])
      }
    }
  }, [messages])


  return (
    <div className="chat">
      <h1 style={{ marginBottom: '30px', borderBottom: '1px solid black' }}>Home</h1>
      {isLoggedIn ?
        // CHAT ROOM
        <div className='room'>
          {/* <p>Room Name: {room}</p> */}
          <div className='room-map'>
            {messages.map(message =>
              <div className='room-map-wrapper'>
                <Avatar src='https://i.imgur.com/W7mI5kZ.png' alt={username} sx={{ bgcolor: lightBlue[400] }} className='room-map-avatar' />
                <div className='room-map-userinput'>
                  <h5 className='room-map-user'>{message.username}</h5>
                  <p className='room-map-message'>{message.message}</p>
                </div>
              </div>
            )}
          </div>
          <form className='room-form' noValidate onSubmit={onClick}>
            <input className='room-form-input' id="text-input" placeholder='Make a comment' value={inputValue} onChange={e => {
              setInputValue(e.target.value)

            }} />
            <button className='btn room-form-btn' type='submit'>Send Chat</button>
          </form>
        </div>

        // TEMP CHAT-LOGIN SCREEN
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

export default Chat;
