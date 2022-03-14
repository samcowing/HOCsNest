import './Chat.scss'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { TextField, Avatar } from '@mui/material/';
import { lightBlue } from '@mui/material/colors'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Chat() {

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const [client, setClient] = useState({})

  const roomsArray = ['home', 'lounge', 'games']

  const roomSelect = async (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('refresh_token')
    const new_client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + room + '/' + '?token=' + token)
    if (token === null)
    {
      console.log("NULL TOKEN")
      navigate('/login')
    }
    setClient(new_client)
    setInputValue('')
  }

  function sendMessage(e) {
    e.preventDefault()
    client.send(JSON.stringify({
      type: 'message',
      message: inputValue,
      username: user.username
    }))
    e.target.value = inputValue
    setInputValue('')
  }

  function onEnter(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault()
      client.send(JSON.stringify({
        type: 'message',
        message: inputValue,
        username: user.username
      }))
      e.target.value = inputValue
      setInputValue('')
    }
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
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      if (dataFromServer) {
        if (dataFromServer.type === 'accept')
        {
          const tmpUser = {
            username: dataFromServer.username,
            user_id: dataFromServer.user_id,
            email: dataFromServer.email,
          }
          setUser(tmpUser)
        }
      }
    }
  }, [client])

  useEffect(() => {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      console.log('got reply!', dataFromServer)
      if (dataFromServer) {
        if (dataFromServer.type === 'message')
        {
          setMessages([...messages, { message: dataFromServer.message, username: dataFromServer.username }])
        }
      }
    }
  }, [messages])

  return (
    <div className="wrapper">
      <div className='room'>

        <h1 className='room-title'>HOCs Nest</h1>
        <h4 className='room-subtitle'>Rooms Available To Join:</h4>

        <div className='room-wrapper'>
          {roomsArray.map(rooms =>

            <form className='room-form' noValidate onSubmit={roomSelect}>
              <div className='room-form-wrapper'>
                <button type="submit" className='btn room-form-btn' onClick={() => setRoom(rooms)}>
                  <input type="image" id="room-name" alt="room-icon" className='room-form-img' src="https://i.imgur.com/W7mI5kZ.png" />
                  <div className='room-form-title'>
                    <h5 className='room-form-title-text'>{rooms}</h5>
                  </div>
                </button>
              </div>
            </form>

          )}
        </div>
        <p style={{ color: 'white', textTransform: 'capitalize', width: '100%' }}>Current Room: {room}</p>
      </div>

      {/* // CHAT ROOM */}
      <div className='chat'>
        <div className='chat-map'>
          {messages.map(message =>
            <div className='chat-map-wrapper'>
              <Avatar src='https://i.imgur.com/W7mI5kZ.png' alt={user.username} sx={{ bgcolor: lightBlue[400] }} className='chat-map-avatar' />
              <div className='chat-map-userinput'>
                <h5 className='chat-map-user'>{message.username}</h5>
                <p className='chat-map-message'>{message.message}</p>
              </div>
            </div>
          )}
        </div>
        <form className='chat-form' noValidate onSubmit={sendMessage}>
          <TextField
            onKeyDown={onEnter}
            inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: '#29b6f6' } }}
            multiline maxRows={5}
            label='Send a message'
            className='chat-form-input'
            id="text-input"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value)
            }} />
          <button className='btn chat-form-btn' type='submit'>Send Chat</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
