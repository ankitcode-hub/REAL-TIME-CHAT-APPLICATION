import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';
import { useSocket } from './useSocket';

export default function App() {
  const [username, setUsername] = useState('');
  const [currentRoom, setCurrentRoom] = useState('general');
  const [joined, setJoined] = useState(false);

  const {
    isConnected,
    messages,
    roomUsers,
    typingUsers,
    rooms,
    sendMessage,
    handleTyping,
    socketId,
  } = useSocket(joined ? username : null, currentRoom);

  const handleJoin = (name, room) => {
    setUsername(name);
    setCurrentRoom(room);
    setJoined(true);
  };

  const handleLeave = () => {
    setJoined(false);
    setUsername('');
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
  };

  if (!joined) {
    return <Login onJoin={handleJoin} />;
  }

  return (
    <Chat
      username={username}
      currentRoom={currentRoom}
      onRoomChange={handleRoomChange}
      onLeave={handleLeave}
      isConnected={isConnected}
      messages={messages}
      roomUsers={roomUsers}
      typingUsers={typingUsers}
      rooms={rooms}
      sendMessage={sendMessage}
      handleTyping={handleTyping}
      socketId={socketId}
    />
  );
}
