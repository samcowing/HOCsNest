import React, { Component } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios'

class Test extends Component {

    state = {
        isLoggedIn: false,
        messages: [],
        value: '',
        username: '',
        room: '1',
    }

    client = new W3CWebSocket('ws://localhost:8000/ws/chat/' + this.state.room + '/')

    onLogIn = (e) => {
        this.setState({ isLoggedIn: true })
        e.preventDefault();
    }

    onButtonClicked = (e) => {
        this.client.send(JSON.stringify({
            type: "message",
            message: this.state.value,
            username: this.state.name
        }));
        this.setState({ value: '' })
        e.preventDefault();
    }

    componentDidMount() {
        this.client.onopen = async () => {
            console.log('WebSocket Client Connected');
            let res = await axios.get("http://localhost:8000/api/messages")
            this.setState({ messages: res.data })
            console.log(res.data)
        };
        this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);
            if (dataFromServer) {
                console.log(this.state.messages)
                this.setState((state) =>
                ({
                    messages: [...state.messages,
                    {
                        message: dataFromServer.message,
                        username: dataFromServer.username,
                    }]
                })
                );
            }
        };
    }

    render() {
        return (
            <div className=''>
                {this.state.isLoggedIn ?
                    <div style={{ marginTop: 50, }}>
                        <h5>Room Name: {this.state.room}</h5>
                        <div style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: 'none', border: '1px solid black' }}>
                            {this.state.messages.map(message => <>
                                <div className=''>
                                    <p>User -- {message.username}</p>
                                    <p>Message -- {message.message}</p>
                                </div>
                            </>)}
                        </div>

                        <form className='' noValidate onSubmit={this.onButtonClicked}>
                            <input id="chat-input" placeholder="Make a comment" value={this.state.value} onChange={e => {
                                this.setState({ value: e.target.value });
                                this.value = this.state.value;
                            }}
                            />
                            <button type="submit">Send Chat</button>
                        </form>
                    </div>
                    :
                    <div>
                        <div className=''>
                            <h1>Home</h1>
                            <h2>HOCs Nest</h2>
                            <form className='' noValidate onSubmit={this.onLogIn}>
                                <input required id="room" placeholder="Chatroom Name" name="Chatroom Name" value={this.state.room} onChange={e => {
                                    this.setState({ room: e.target.value });
                                    this.value = this.state.room;
                                }}
                                />
                                <input required name="Username" placeholder="Username" type="Username" id="username" value={this.state.name} onChange={e => {
                                    this.setState({ name: e.target.value });
                                    this.value = this.state.name;
                                }}
                                />
                                <button type="submit">Start Chatting</button>
                            </form>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default (Test)
