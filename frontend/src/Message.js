import React from 'react';
import './Message.css';

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Message({ msg, isOwn }) {
  if (msg.type === 'system') {
    return (
      <div className="msg-system">
        <span className="sys-line" />
        <span className="sys-text">{msg.content}</span>
        <span className="sys-line" />
      </div>
    );
  }

  return (
    <div className={`msg-row ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && (
        <div className="msg-avatar" style={{ background: msg.color + '22', borderColor: msg.color }}>
          <span style={{ color: msg.color }}>{msg.username[0].toUpperCase()}</span>
        </div>
      )}
      <div className="msg-content">
        {!isOwn && (
          <div className="msg-meta">
            <span className="msg-username" style={{ color: msg.color }}>{msg.username}</span>
            <span className="msg-time">{formatTime(msg.timestamp)}</span>
          </div>
        )}
        <div className={`msg-bubble ${isOwn ? 'own-bubble' : 'other-bubble'}`}>
          {msg.content}
        </div>
        {isOwn && <div className="msg-time own-time">{formatTime(msg.timestamp)}</div>}
      </div>
      {isOwn && (
        <div className="msg-avatar own-avatar" style={{ background: msg.color + '22', borderColor: msg.color }}>
          <span style={{ color: msg.color }}>{msg.username[0].toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}
