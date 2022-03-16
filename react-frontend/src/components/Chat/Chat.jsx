import './Chat.scss'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { TextField, Avatar, Button } from '@mui/material/';
import { lightBlue } from '@mui/material/colors'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { styled } from '@mui/material/styles';

const LightTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#03ccc97a',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#03ccc97a',
    },
  },
});

const DarkTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#588eeb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#588eeb',
    },
  },
});

function Chat({ theme }) {

  const navigate = useNavigate()

  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const [client, setClient] = useState({})
  const [activeRoom, setActiveRoom] = useState(false)

  const [roomsArr, setRoomsArr] = useState([
    { name: 'home' },
    { name: 'lounge' },
    { name: 'games' },
  ])

  const messagesEndRef = useRef(null)

  const roomSelect = async (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('refresh_token')
    const new_client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + room + '/' + '?token=' + token)
    if (token === null) {
      navigate('/login')
    }
    setClient(new_client)
    setActiveRoom(room)
    if (activeRoom === room) {
      setActiveRoom(true)
    }
    setInputValue('')
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
    }
  })

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
      if (inputValue !== '') {
        client.send(JSON.stringify({
          type: 'message',
          message: inputValue,
          username: user.username
        }))
      }
      e.target.value = inputValue
      setInputValue('')
    }
  }

  useEffect(() => {
    client.onopen = async () => {
      console.log('WebSocket Client Connected')
      const res = await axios.get("http://localhost:8000/api/messages?room=" + room + '&page=1')
      const prevMessages = res.data.results.map((element) => {
        return {
          message: element.message,
          username: element.user.username
        }
      })
      setMessages(prevMessages.reverse())
    }
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data)
      if (dataFromServer) {
        if (dataFromServer.type === 'accept') {
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
      if (dataFromServer) {
        if (dataFromServer.type === 'message') {
          setMessages([...messages, { message: dataFromServer.message, username: dataFromServer.username }])
        }
      }
    }
  }, [messages])

  return (
    <div className="wrapper" >
      <div className='room'>
        <h1 className='room-title'>HOCs Nest</h1>
        <h4 className='room-subtitle'>Rooms Available To Join:</h4>

        <div className='room-wrapper'>

          {roomsArr.map(rooms =>
            <form key={rooms.name} className='room-form' noValidate onSubmit={roomSelect}>
              <div className='room-form-wrapper' key={rooms.name}>
                <button type="submit" className={'btn room-form-btn' + (activeRoom === rooms.name ? ' room-active-btn' : '')} onClick={() => setRoom(rooms.name)}>
                  <input type="image" id="room-name" alt="room-icon" className='room-form-img' src="https://i.imgur.com/W7mI5kZ.png" />
                  <div className={'room-form-title' + (activeRoom === rooms.name ? ' room-active-title' : '')}>
                    <h5 className='room-form-title-text'>{rooms.name}</h5>
                  </div>
                </button>
              </div>
            </form>
          )}

        </div>
        <p style={{ textTransform: 'capitalize', width: '100%', margin: '0px' }}>Current Room: {room}</p>
      </div>

      {/* // CHAT ROOM */}
      {activeRoom ?
        <div className='chat'>
          <div className='chat-map'>
            {messages.map(message =>
              <div className={'chat-map-wrapper' + (message.username === user.username ? ' active-user' : '')} >
                <Avatar src='https://i.imgur.com/W7mI5kZ.png' alt={user.username} className={'chat-map-avatar' + (message.username === user.username ? ' active-user-avatar' : '')} />
                <div className='chat-map-userinput'>
                  <h5 className={'chat-map-user' + (message.username === user.username ? ' active-user-text' : '')}>{message.username}</h5>
                  <p className='chat-map-message'>{message.message}</p>
                </div>
              </div>
            )}
            <div className='chat-map-ref' ref={messagesEndRef} />
          </div>
          <form className='chat-form' noValidate onSubmit={sendMessage}>
            {theme === 'light' ?
              <LightTextField
                onKeyDown={onEnter}
                inputProps={{ style: { color: 'black' } }} InputLabelProps={{ style: { color: '#00B0AE' } }}
                multiline maxRows={5}
                label='Send a message'
                className='chat-form-input'
                id="text-input"
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                }} />
              :
              <DarkTextField
                onKeyDown={onEnter}
                inputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: '#588eeb' } }}
                multiline maxRows={5}
                label='Send a message'
                className='chat-form-input'
                id="text-input"
                value={inputValue}
                onChange={e => {
                  setInputValue(e.target.value)
                }} />
            }
            <button className='btn chat-form-btn' type='submit'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
              </svg>
            </button>
          </form>
        </div>
        :
        <></>
      }
    </div >
  );
}

export default Chat;
