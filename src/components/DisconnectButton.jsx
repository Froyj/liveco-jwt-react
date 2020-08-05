import React from 'react';
import cookie from 'js-cookie';

const DisconnectButton = ({setUser}) => {
  const handleDisconnection = (e) => {
    setUser(null)
    cookie.remove("id")
  } 
  return (
    <button onClick={handleDisconnection}>Disconnect</button>
  );
}

export default DisconnectButton;