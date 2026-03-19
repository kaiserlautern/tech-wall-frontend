import { useState, useEffect } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/messages`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleNewMessage = (newMsg) => {
    setMessages((prev) => [newMsg, ...prev]);
  };

  const handleLike = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}/like`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to like message');
      const updatedMsg = await res.json();
      
      setMessages((prev) => 
        prev.map((msg) => msg.id === id ? updatedMsg : msg)
      );
    } catch (err) {
      console.error(err);
      // Optional: show a toast here instead of full error
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Tech Wall</h1>
        <p className="subtitle">Share your thoughts with the developer community.</p>
      </header>

      <main>
        <MessageForm onMessagePosted={handleNewMessage} />
        
        {error && <div className="error-message">Error: {error}</div>}
        
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <MessageList messages={messages} onLike={handleLike} />
        )}
      </main>
    </div>
  );
}

export default App;
