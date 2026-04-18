import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import './Chat.css';

const ROOMS = [
  { id: 'general', label: 'general' },
  { id: 'tech', label: 'tech' },
  { id: 'random', label: 'random' },
];

export default function Chat({
  username,
  currentRoom,
  onRoomChange,
  onLeave,
  isConnected,
  messages,
  roomUsers,
  typingUsers,
  rooms,
  sendMessage,
  handleTyping,
  socketId,
}) {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    if (e.target.value) handleTyping();
  };

  const typingText = typingUsers.length > 0
    ? typingUsers.length === 1
      ? `${typingUsers[0]} is typing`
      : `${typingUsers.join(', ')} are typing`
    : null;

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sl-bracket">[</span>
            <span className="sl-text">NX</span>
            <span className="sl-bracket">]</span>
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {sidebarOpen && (
          <>
            <div className="sidebar-section">
              <div className="section-label">CHANNELS</div>
              {rooms.length > 0
                ? rooms.map((r) => (
                    <button
                      key={r.id}
                      className={`channel-btn ${currentRoom === r.id ? 'active' : ''}`}
                      onClick={() => onRoomChange(r.id)}
                    >
                      <span className="ch-hash">#</span>
                      <span className="ch-name">{r.name.toLowerCase()}</span>
                      {r.count > 0 && (
                        <span className="ch-count">{r.count}</span>
                      )}
                    </button>
                  ))
                : ROOMS.map((r) => (
                    <button
                      key={r.id}
                      className={`channel-btn ${currentRoom === r.id ? 'active' : ''}`}
                      onClick={() => onRoomChange(r.id)}
                    >
                      <span className="ch-hash">#</span>
                      <span className="ch-name">{r.label}</span>
                    </button>
                  ))}
            </div>

            <div className="sidebar-section">
              <div className="section-label">ONLINE — {roomUsers.length}</div>
              <div className="users-list">
                {roomUsers.map((u) => (
                  <div key={u.socketId} className="user-item">
                    <span className="user-dot" style={{ background: u.color }} />
                    <span className="user-name" style={{ color: u.socketId === socketId ? u.color : undefined }}>
                      {u.username}
                      {u.socketId === socketId && ' (you)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-footer">
              <div className="me-card">
                <div className="me-avatar">
                  {username[0].toUpperCase()}
                </div>
                <div className="me-info">
                  <div className="me-name">{username}</div>
                  <div className={`me-status ${isConnected ? 'online' : 'offline'}`}>
                    {isConnected ? '● online' : '○ offline'}
                  </div>
                </div>
                <button className="leave-btn" onClick={onLeave} title="Leave chat">✕</button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Main chat area */}
      <main className="chat-main">
        <div className="chat-topbar">
          <div className="topbar-left">
            <span className="topbar-hash">#</span>
            <span className="topbar-room">{currentRoom}</span>
            <span className="topbar-sep">—</span>
            <span className="topbar-desc">
              {currentRoom === 'general' && 'General conversation'}
              {currentRoom === 'tech' && 'Technology discussion'}
              {currentRoom === 'random' && 'Anything goes'}
            </span>
          </div>
          <div className="topbar-right">
            <div className={`conn-badge ${isConnected ? 'connected' : 'disconnected'}`}>
              <span className="conn-dot" />
              <span>{isConnected ? 'LIVE' : 'RECONNECTING'}</span>
            </div>
          </div>
        </div>

        <div className="messages-area">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">#</div>
              <div className="empty-text">No messages yet.</div>
              <div className="empty-sub">Be the first to say something in #{currentRoom}</div>
            </div>
          )}

          {messages.map((msg) => (
            <Message
              key={msg.id}
              msg={msg}
              isOwn={msg.username === username && msg.type === 'chat'}
            />
          ))}

          {typingText && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span /><span /><span />
              </div>
              <span className="typing-text">{typingText}...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-box">
            <span className="input-room-label">#{currentRoom}</span>
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder={`Message #${currentRoom}...`}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={!isConnected}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim() || !isConnected}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="input-hint">
            <span>Enter to send · Shift+Enter for newline</span>
          </div>
        </div>
      </main>
    </div>
  );
}
