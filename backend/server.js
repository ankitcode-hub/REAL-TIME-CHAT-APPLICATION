const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// In-memory storage
const messageHistory = {}; // { roomId: [messages] }
const users = {}; // { socketId: { username, room, color } }
const typingUsers = {}; // { roomId: { socketId: username } }

const ROOMS = ["general", "tech", "random"];
const USER_COLORS = [
  "#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7",
  "#DDA0DD","#98D8C8","#F7DC6F","#BB8FCE","#85C1E9",
];

// Initialize rooms
ROOMS.forEach((room) => {
  messageHistory[room] = [];
  typingUsers[room] = {};
});

function getRandomColor() {
  return USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
}

function createMessage(type, data) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type, // 'chat' | 'system'
    timestamp: new Date().toISOString(),
    ...data,
  };
}

// REST endpoint to get available rooms
app.get("/api/rooms", (req, res) => {
  const roomData = ROOMS.map((room) => ({
    id: room,
    name: room.charAt(0).toUpperCase() + room.slice(1),
    count: Object.values(users).filter((u) => u.room === room).length,
  }));
  res.json(roomData);
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // User joins with username + room
  socket.on("join", ({ username, room = "general" }) => {
    // Clean up from any previous room
    const prevUser = users[socket.id];
    if (prevUser) {
      const prevRoom = prevUser.room;
      socket.leave(prevRoom);
      delete typingUsers[prevRoom]?.[socket.id];

      const leaveMsg = createMessage("system", {
        content: `${prevUser.username} left the room`,
        room: prevRoom,
      });
      messageHistory[prevRoom].push(leaveMsg);
      socket.to(prevRoom).emit("message", leaveMsg);
      io.to(prevRoom).emit("room_users", getRoomUsers(prevRoom));
    }

    const color = prevUser?.color || getRandomColor();
    users[socket.id] = { username, room, color, socketId: socket.id };

    socket.join(room);

    // Send message history to the new user
    socket.emit("history", messageHistory[room] || []);

    // Notify others
    const joinMsg = createMessage("system", {
      content: `${username} joined the room`,
      room,
    });
    messageHistory[room].push(joinMsg);
    socket.to(room).emit("message", joinMsg);

    // Send room users list to everyone in room
    io.to(room).emit("room_users", getRoomUsers(room));

    // Send updated room list to all
    io.emit("rooms_update", getRoomsData());

    console.log(`${username} joined room: ${room}`);
  });

  // Handle chat messages
  socket.on("send_message", ({ content, room }) => {
    const user = users[socket.id];
    if (!user || !content.trim()) return;

    // Clear typing
    if (typingUsers[room]) {
      delete typingUsers[room][socket.id];
      io.to(room).emit("typing_update", Object.values(typingUsers[room]));
    }

    const msg = createMessage("chat", {
      content: content.trim(),
      username: user.username,
      color: user.color,
      room,
    });

    // Store (cap at 100 messages per room)
    if (!messageHistory[room]) messageHistory[room] = [];
    messageHistory[room].push(msg);
    if (messageHistory[room].length > 100) {
      messageHistory[room] = messageHistory[room].slice(-100);
    }

    // Broadcast to everyone in the room (including sender)
    io.to(room).emit("message", msg);
  });

  // Handle typing indicator
  socket.on("typing", ({ room, isTyping }) => {
    const user = users[socket.id];
    if (!user) return;

    if (!typingUsers[room]) typingUsers[room] = {};

    if (isTyping) {
      typingUsers[room][socket.id] = user.username;
    } else {
      delete typingUsers[room][socket.id];
    }

    socket.to(room).emit("typing_update", Object.values(typingUsers[room]));
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const { username, room } = user;

      // Clear typing
      if (typingUsers[room]) delete typingUsers[room][socket.id];

      const leaveMsg = createMessage("system", {
        content: `${username} left the chat`,
        room,
      });
      messageHistory[room].push(leaveMsg);
      socket.to(room).emit("message", leaveMsg);
      io.to(room).emit("room_users", getRoomUsers(room));
      io.emit("rooms_update", getRoomsData());

      delete users[socket.id];
      console.log(`${username} disconnected`);
    }
  });
});

function getRoomUsers(room) {
  return Object.values(users).filter((u) => u.room === room);
}

function getRoomsData() {
  return ROOMS.map((room) => ({
    id: room,
    name: room.charAt(0).toUpperCase() + room.slice(1),
    count: Object.values(users).filter((u) => u.room === room).length,
  }));
}

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Chat server running on http://localhost:${PORT}`);
});
