import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client'

let socket

const Chat = ({ location }) => {
    const [username, setUsername] = useState(' ');
    const [room, setRoom] = useState(' ');
    const ENDPOINT = 'localhost:4242'
    useEffect(() => {
        const { username, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setUsername(username);
        setRoom(room)

        console.log(socket)


    }, [ENDPOINT, location.search])
    return (
        <h1>Chat</h1>
    )
}

export default Chat