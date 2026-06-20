import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Leaf, Sparkles, User } from 'lucide-react';
import './Chat.css';

const initialMessages = [
  {
    id: 1,
    type: 'ai',
    text: "Hello! I'm your EcoBuddy AI. I noticed your transport emissions were a bit high this week. How can I help you reduce your footprint today?",
  }
];

const suggestions = [
  "Why is my footprint high this month?",
  "How can I reduce my emissions?",
  "Compare my footprint with last month.",
];

/**
 * Chat component providing a conversational AI interface for sustainability coaching.
 * @returns {JSX.Element} The rendered Chat component.
 */
const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    // eslint-disable-next-line react-hooks/purity
    const newUserMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: "That's a great question! Based on your recent data, your highest emission source is driving. Switching to public transit twice a week could lower your monthly footprint by 20%. Would you like me to find the best transit routes for your usual commute?",
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <motion.main 
      className="chat-container container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="AI Climate Coach Chat"
    >
      <section className="chat-interface glass-panel" aria-live="polite">
        
        <header className="chat-header">
          <div className="ai-avatar" aria-hidden="true">
            <Leaf size={20} color="var(--color-neon-mint)" />
          </div>
          <div>
            <h2>EcoBuddy AI</h2>
            <span className="status" role="status">Providing context-aware responses based on your scanned bills</span>
          </div>
        </header>

        <div className="messages-area" role="log" aria-live="polite">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message-wrapper ${msg.type}`}
            >
              <div className="message-avatar">
                {msg.type === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              <div className="message-bubble">
                <p>{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="message-wrapper ai"
            >
              <div className="message-avatar">
                <Sparkles size={16} />
              </div>
              <div className="message-bubble typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="suggestions-area" aria-label="Suggested questions">
          {suggestions.map((suggestion, idx) => (
            <button 
              key={idx} 
              className="suggestion-chip glass-button-secondary"
              onClick={() => handleSend(suggestion)}
              aria-label={`Ask: ${suggestion}`}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="input-area">
          <label htmlFor="chat-input" className="sr-only" style={{display: 'none'}}>Type your message</label>
          <input 
            id="chat-input"
            type="text" 
            placeholder="Ask about your carbon footprint..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
            aria-label="Type your message to EcoBuddy AI"
          />
          <button 
            className="send-button"
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            <Send size={20} aria-hidden="true" />
          </button>
        </div>
        
      </section>
    </motion.main>
  );
};

export default Chat;
