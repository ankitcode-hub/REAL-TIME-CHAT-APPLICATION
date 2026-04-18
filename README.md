# ⚡ Nexus Chat — Real-Time Chat Application

A full-stack real-time chat application built with **React.js** + **Node.js** + **Socket.IO**.

---

## ✨ Features

| Feature | Status |
|---|---|
| Real-time messaging via WebSockets | ✅ |
| Username login screen | ✅ |
| Message timestamps | ✅ |
| Sender vs others message styling | ✅ |
| Auto-scroll to latest message | ✅ |
| User joined / left notifications | ✅ |
| Typing indicator | ✅ |
| Multiple rooms (general, tech, random) | ✅ |
| Online users list per room | ✅ |
| Message history on join (last 100) | ✅ |
| Responsive layout | ✅ |

---

## 🗂 Project Structure

```
nexus-chat/
├── backend/
│   ├── server.js          # Express + Socket.IO server
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Root component (login/chat router)
│   │   ├── Login.js       # Login screen
│   │   ├── Login.css
│   │   ├── Chat.js        # Main chat layout
│   │   ├── Chat.css
│   │   ├── Message.js     # Individual message component
│   │   ├── Message.css
│   │   ├── useSocket.js   # Socket.IO React hook
│   │   ├── index.js
│   │   └── index.css      # Global styles & CSS variables
│   └── package.json
├── package.json           # Root convenience scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ and **npm** installed

### Option A — Run each terminal separately (recommended)

**Terminal 1 — Backend:**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000 in browser
```

### Option B — Run both with one command (from root)
```bash
npm install          # installs concurrently
npm run install:all  # installs backend + frontend deps
npm run dev          # starts both servers
```

---

## 🔌 How It Works

### WebSocket Events

| Event | Direction | Description |
|---|---|---|
| `join` | Client → Server | User joins with username + room |
| `send_message` | Client → Server | Send a chat message |
| `typing` | Client → Server | Notify typing status |
| `history` | Server → Client | Message history on join |
| `message` | Server → Client | New message broadcast |
| `room_users` | Server → Client | Updated user list for room |
| `typing_update` | Server → Client | Who is typing in this room |
| `rooms_update` | Server → All | Updated room user counts |

### Architecture
```
Browser (React)  ←──WebSocket──→  Node.js (Express + Socket.IO)
     ↕                                         ↕
useSocket hook                        In-memory store
(manages events,                   (messages[], users{})
 state, UI)
```

---

## 🎨 Tech Stack

- **Frontend:** React 18, Socket.IO Client, CSS Variables
- **Backend:** Node.js, Express, Socket.IO 4
- **Fonts:** Syne (display) + Space Mono (monospace)
- **No database required** — messages stored in memory (last 100 per room)

---

## 📡 API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/rooms` | List rooms with user counts |

---

## 🧪 Testing Multi-User

Open **multiple browser tabs or windows** at `http://localhost:3000`, each with a different username. Messages appear in real-time across all connected clients.
