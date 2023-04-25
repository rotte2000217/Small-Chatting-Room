import React from "react";

import { MessageContainer } from "../MessageContainer/message.container";
import { SendMessageForm } from "../SendMessageForm/send.message.form";
import { ConnectedUsers } from "../ConnectedUsers/connected.users";

import "./style.scss";

export const Chat = ({
  messages,
  sendMessage,
  closeConnection,
  users,
  room,
}) => {
  return (
    <>
      <div className="room-title">
        <h1>Room {room}</h1>
      </div>
      <div className="leave-room">
        <button onClick={() => closeConnection()}>Leave Room</button>
      </div>
      <div className="chat-container">
        <ConnectedUsers users={users} />
        <div>
          <MessageContainer messages={messages} />
          <SendMessageForm sendMessage={sendMessage} />
        </div>
      </div>
    </>
  );
};
