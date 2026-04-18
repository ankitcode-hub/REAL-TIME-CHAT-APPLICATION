import React, { useState } from 'react';
import './Login.css';

export default function Login({ onJoin }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');
  const [error, setError] = useState('');

  const ROOMS = [
    { id: 'general', label: '# general', desc: 'General conversation' },
    { id: 'tech', label: '# tech', desc: 'Tech talk' },
    { id: 'random', label: '# random', desc: 'Anything goes' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) { setError('Username cannot be empty'); return; }
    if (trimmed.length < 2) { setError('At least 2 characters'); return; }
    if (trimmed.length > 20) { setError('Max 20 characters'); return; }
    onJoin(trimmed, room);
  };

  return (
    <div className="login-wrapper">
      <div className="login-grid-bg" />
      <div className="login-scanline" />

      <div className="login-box">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">REAL-TIME CHAT</span>
            <span className="logo-bracket">]</span>
          </div>
          <p className="login-tagline">Connect and chat instantly</p>
          <div className="login-status-row">
            <span className="status-dot" />
            <span className="status-label">SYSTEM ONLINE</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">IDENTITY</label>
            <div className="input-wrapper">
              <span className="input-prefix">&gt;_</span>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your callsign..."
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                maxLength={20}
                autoFocus
              />
            </div>
            {error && <p className="form-error">{error}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">CHANNEL</label>
            <div className="room-grid">
              {ROOMS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`room-btn ${room === r.id ? 'active' : ''}`}
                  onClick={() => setRoom(r.id)}
                >
                  <span className="room-label">{r.label}</span>
                  <span className="room-desc">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="login-submit">
            <span>ESTABLISH CONNECTION</span>
            <span className="submit-arrow">→</span>
          </button>
        </form>

        <div className="login-footer">
          <span>v2.4.1</span>
          <span>WS://NEXUS-CHAT</span>
          <span>256-BIT</span>
        </div>
      </div>
    </div>
  );
}
