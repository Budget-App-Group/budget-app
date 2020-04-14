import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Message/Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../input/Input";

import "./Chat.css";
import { resolveHostname } from "nodemailer/lib/shared";



const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:4242";
  
  const socket = io(ENDPOINT);
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);


    setRoom(room);
    setName(name);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);

      }
    })
  },[location.search]);
  socket.on(" New message", ({message, room}) => {
    setMessages((messages) => [...messages, message]);
    setRoom((room) => [...room, room])
  });


  socket.on("roomData", ({ users }) => {
    setUsers(users);
  });

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, "sendRoom", room, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
