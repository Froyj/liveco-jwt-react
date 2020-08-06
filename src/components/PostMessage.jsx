import React, { useState } from "react";
import axios from "axios";

const PostMessage = ({ user, updateComments }) => {
  const [message, setMessage] = useState("Write your message");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/users/${user}/comments`, {
      message,
    })
    .then(res => res.data)
    .then(msg => updateComments(msg))
    .then(() => setMessage(''))
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button type="submit">Send message</button>
    </form>
  );
};

export default PostMessage;
