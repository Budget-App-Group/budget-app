import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Message/Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../input/Input";

<<<<<<< HEAD
import './Chat.css'
=======
import "./Chat.css";
>>>>>>> e15e703867ae5884a2f6f0a53ffa00e414c50a8a

let socket;

const Chat = ({ location }) => {
<<<<<<< HEAD
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
=======
  const [username, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
>>>>>>> e15e703867ae5884a2f6f0a53ffa00e414c50a8a
  const [messages, setMessages] = useState([]);
<<<<<<< HEAD
  const ENDPOINT = 'http://localhost:4242';
=======
  const ENDPOINT = "https://localhost:4242";
>>>>>>> master

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
<<<<<<< HEAD
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
=======
    setName(username);

    socket.emit("join", { username, room }, (error) => {
      if (error) {
>>>>>>> e15e703867ae5884a2f6f0a53ffa00e414c50a8a
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
<<<<<<< HEAD
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
=======
        <InfoBar room={room} />
        <Messages messages={messages} username={username} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
>>>>>>> e15e703867ae5884a2f6f0a53ffa00e414c50a8a
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
