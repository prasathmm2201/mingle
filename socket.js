// useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { config } from './config';

const socketUrl = config?.api_url; // Replace with your actual server URL and port

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create the socket instance and establish the connection
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

