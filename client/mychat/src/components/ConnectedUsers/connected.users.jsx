import React from "react";

import "./style.scss";

export const ConnectedUsers = ({ users }) => {
  return (
    <div className="user-list">
      <h2>Connected Users</h2>
      {users.map((u, index) => (
        <h3 key={index}>{u}</h3>
      ))}
    </div>
  );
};
