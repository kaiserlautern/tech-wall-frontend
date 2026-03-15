import { useState } from 'react';
import { Send } from 'lucide-react';

const MessageForm = ({ onMessagePosted }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('Failed to post message');
      
      const newMsg = await res.json();
      setText('');
      onMessagePosted(newMsg);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's on your mind? Share with the tech community..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSubmitting}
        required
      />
      <button 
        type="submit" 
        className="btn-submit" 
        disabled={isSubmitting || !text.trim()}
      >
        {isSubmitting ? 'Posting...' : (
          <>
            <span>Post Message</span>
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default MessageForm;
