import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5001';

export function useSocket(username, currentRoom) {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });

    socketRef.current.on('connect', () => setIsConnected(true));
    socketRef.current.on('disconnect', () => setIsConnected(false));

    socketRef.current.on('history', (history) => {
      setMessages(history);
    });

    socketRef.current.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on('room_users', (users) => {
      setRoomUsers(users);
    });

    socketRef.current.on('typing_update', (users) => {
      setTypingUsers(users);
    });

    socketRef.current.on('rooms_update', (roomsData) => {
      setRooms(roomsData);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Join room when username or room changes
  useEffect(() => {
    if (socketRef.current && username && currentRoom) {
      setMessages([]);
      setTypingUsers([]);
      socketRef.current.emit('join', { username, room: currentRoom });
    }
  }, [username, currentRoom]);

  const sendMessage = useCallback((content) => {
    if (socketRef.current && content.trim()) {
      socketRef.current.emit('send_message', { content, room: currentRoom });
    }
  }, [currentRoom]);

  const emitTyping = useCallback((isTyping) => {
    if (socketRef.current) {
      socketRef.current.emit('typing', { room: currentRoom, isTyping });
    }
  }, [currentRoom]);

  const handleTyping = useCallback(() => {
    emitTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => emitTyping(false), 2000);
  }, [emitTyping]);

  return {
    isConnected,
    messages,
    roomUsers,
    typingUsers,
    rooms,
    sendMessage,
    handleTyping,
    socketId: socketRef.current?.id,
  };
}
