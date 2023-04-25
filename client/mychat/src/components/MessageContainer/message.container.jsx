import React, { useEffect, useRef } from "react";

import "./style.scss";

export const MessageContainer = ({ messages }) => {
  // this is going to keep a reference of the div below
  const messageRef = useRef();

  // everytime messages change we are going to run this function
  useEffect(() => {
    if (messageRef && messageRef.current) {
      // out of the messageRef.current we take out the scrollHeigt and clientHeight, and with that we can scrollTo
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className="message-container">
      {messages.map((m, index) => (
        <div key={index} className="user-message">
          <div className="message">{m.message}</div>
          <div className="from-user">
            {m.date} <span />
            {m.user}
          </div>
        </div>
      ))}
    </div>
  );
};
