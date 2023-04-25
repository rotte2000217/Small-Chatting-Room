import React, { useState } from "react";

import "./style.scss";

export const Lobby = ({ joinRoom }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  return (
    <div className="login-container">
      <h1>MyChat</h1>
      <hr />
      <form
        className="login-form"
        onSubmit={(e) => {
          // prevent the page from refreshing
          e.preventDefault();
          joinRoom(user, room);
        }}
      >
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit" disabled={!user || !room}>
          Join
        </button>
      </form>
    </div>
  );
};
