import './Chat.scss'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Avatar from '@mui/material/Avatar'
import { lightBlue } from '@mui/material/colors'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('home')
  const [client, setClient] = useState({})

  const roomsArray = ['home', 'lounge', 'games']

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
      console.log()
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
    <div className="wrapper">
      {isLoggedIn ?
        // CHAT ROOM
        <div className='chat'>
          <p style={{ color: 'white' }}>Room Name: {room}</p>
          <div className='chat-map'>
            {messages.map(message =>
              <div className='chat-map-wrapper'>
                <Avatar src='https://i.imgur.com/W7mI5kZ.png' alt={username} sx={{ bgcolor: lightBlue[400] }} className='chat-map-avatar' />
                <div className='chat-map-userinput'>
                  <h5 className='chat-map-user'>{message.username}</h5>
                  <p className='chat-map-message'>{message.message}</p>
                </div>
              </div>
            )}
          </div>
          <form className='chat-form' noValidate onSubmit={onClick}>
            <input className='chat-form-input' id="text-input" placeholder='Make a comment' value={inputValue} onChange={e => {
              setInputValue(e.target.value)

            }} />
            <button className='btn chat-form-btn' type='submit'>Send Chat</button>
          </form>
        </div>

        // TEMP CHAT-LOGIN SCREEN
        :
        <div className='room'>

          <h1 className='room-title'>HOCs Nest</h1>
          <h4 className='room-subtitle'>Click A Channel To Join:</h4>

          <div className='room-wrapper'>
            {roomsArray.map(room =>

              <form className='room-form' noValidate onSubmit={logIn}>
                <div className='room-form-wrapper'>
                  <button type="submit" className='btn room-form-btn'>
                    <input type="image" id="room-name" alt="room-icon" className='room-form-img' value={room} src="https://i.imgur.com/W7mI5kZ.png" onClick={e => {
                      setRoom(e.target.value)
                    }} />
                    <div className='room-form-title'>
                      <h5 className='room-form-title-text'>{room}</h5>
                    </div>
                  </button>
                </div>
              </form>

            )}
          </div>

        </div>
      }
    </div>
  );
}

export default Chat;
