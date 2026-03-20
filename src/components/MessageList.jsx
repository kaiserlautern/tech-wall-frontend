import { Heart } from 'lucide-react';

const MessageList = ({ messages, onLike }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="message-card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        No messages yet. Be the first to post!
      </div>
    );
  }

  // Handle local state visual change when liking before refetch, although App.js state handles the update
  return (
    <div className="messages-grid">
      {messages.map((msg) => (
        <div key={msg.id} className="message-card">
          <div className="message-text">{msg.text}</div>

          <div className="message-footer">
            <span className="message-date">
              {new Date(msg.created_at).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>

            <button
              className={`like-btn ${msg.likes > 0 ? 'liked' : ''}`}
              onClick={() => onLike(msg.id)}
            >
              <Heart
                size={32}
                className="like-icon"
                fill={msg.likes > 0 ? 'currentColor' : 'none'}
              />
              <span>{msg.likes}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
