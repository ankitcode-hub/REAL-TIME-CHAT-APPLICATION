# REAL-TIME-CHAT-APPLICATION

COMPANY: CODTECH IT SOLUTIONS

NAME: ANKIT KUMAR

INTERN ID: CTIS7920

DOMAIN: FRONTEND WEB DEVELOPMENT

DURATION: 4 WEEKS

MENTOR: NEELA SANTHOSH KUMAR

** DISCREPTION: 
Nexus Chat — Real-Time Chat Application
Nexus Chat is a fully functional, production-grade real-time chat application built using modern web technologies. The project demonstrates the complete implementation of WebSocket-based communication using React.js on the frontend and Node.js with Express and Socket.IO on the backend. This application allows multiple users to connect simultaneously, exchange messages instantly, and interact across different chat rooms — all without any page refresh or manual reload.
The goal of this project was to build a complete full-stack real-time communication platform from scratch. Unlike traditional HTTP-based applications where the client has to repeatedly request data from the server, Nexus Chat uses WebSocket technology through Socket.IO to maintain a persistent, two-way connection between the client and the server. This means messages are delivered instantly to all connected users the moment they are sent — making the experience feel truly real-time and live. The application is designed to handle multiple concurrent users across multiple rooms simultaneously without any performance issues.
Technology Stack: On the frontend, the application uses React.js 18 for building the interactive component-based user interface, Socket.IO Client for managing WebSocket connections, and CSS3 with custom variables for theming, animations, and responsive layouts. Google Fonts (Syne and Space Mono) were used to give the application a distinctive, modern typographic identity. On the backend, Node.js serves as the JavaScript runtime, Express.js handles HTTP routing and API endpoints, and Socket.IO manages all real-time bidirectional communication between clients and the server. Message history and active user sessions are stored in-memory on the server.
Core Features: Nexus Chat supports three dedicated chat channels — #general, #tech, and #random — allowing users to join topic-specific conversations and switch between rooms at any time. Every message sent by a user is instantly broadcast to all other connected users in the same room using WebSocket events with zero delay. Before entering the chat, every user must provide a unique username or callsign, and each user is automatically assigned a unique color to visually differentiate their messages in the chat window. When a new user joins any room, they immediately receive the last 100 messages from that room so they have full context of the ongoing conversation. A live typing indicator shows when another user is composing a message, and it automatically disappears after two seconds of inactivity. Whenever a user enters or exits a chat room, a system notification is broadcast to all members of that room. The sidebar also displays a live list of all users currently connected to the same room, complete with their assigned colors and usernames.
Design Philosophy: Nexus Chat features a dark industrial terminal aesthetic with a carefully chosen color palette built around deep navy backgrounds and a signature cyan accent color. The interface uses CSS custom variables for complete theming consistency throughout the application. Smooth animations and micro-interactions are used throughout to make the experience feel polished and professional. The layout is fully responsive and works seamlessly across desktop and mobile screen sizes, with a collapsible sidebar to maximize the chat area on smaller screens.
Project Structure: The project is cleanly separated into two independent folders — backend and frontend — following industry-standard full-stack architecture. The frontend contains six dedicated React source files each with a single clear responsibility: App.js for routing, Login.js for the entry screen, Chat.js for the main layout, Message.js for individual message rendering, and useSocket.js as a custom React hook that manages the entire Socket.IO lifecycle and state management. The backend is contained within a single well-structured server.js file that handles all WebSocket events, room management, user tracking, message storage, and broadcasting logic.
Real-World Application: This project closely mirrors the architecture of production-grade chat applications like Slack, Discord, and Microsoft Teams. The skills demonstrated include full-stack JavaScript development, real-time WebSocket communication, React hooks and state management, RESTful API design, multi-room chat architecture, responsive UI design, and complete Git and GitHub version control workflow. Nexus Chat is a strong demonstration of modern web development skills and serves as a solid foundation that can be extended with features like database persistence, user authentication, file sharing, and end-to-end encryption.

**OUTPUT: 
<img width="1908" height="905" alt="Image" src="https://github.com/user-attachments/assets/bc893be6-20eb-4009-aafa-f9186d3b0033" />
