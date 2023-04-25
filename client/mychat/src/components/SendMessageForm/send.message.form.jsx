import React, { useState } from "react";

import "./style.scss";

export const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <divv className="send-message-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }}
      >
        <input
          type="text"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" disabled={!message}>
          Send
        </button>
      </form>
    </divv>
  );
};
