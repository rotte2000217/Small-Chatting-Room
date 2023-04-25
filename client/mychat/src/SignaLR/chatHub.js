import React, { useState } from "react";

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Lobby } from "../components/Lobby/lobby";
import { Chat } from "../components/chat/chat";

export const ChatHub = (props) => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState();

  const joinRoom = async (user, room) => {
    try {
      // create a connection
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7049/chat")
        .configureLogging(LogLevel.Information)
        .build();

      // setup the handlers
      connection.on("ReceiveMessage", (user, message, date) => {
        setMessages((messages) => [...messages, { user, message, date }]);
      });
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      // start the connection
      await connection.start();
      // invoke the JoinRoom method (in the server side)
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
      setRoom(room);

      // clear when the connection is closed
      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.error(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
          users={users}
          room={room}
        />
      )}
    </div>
  );
};
