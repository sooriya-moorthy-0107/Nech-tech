import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, MessageCircle, Phone } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: 'bot', text: 'Hello! Welcome to Nech Technology. How can I assist you with your software development, cloud, or startup integration needs today?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    if (text.includes('service') || text.includes('offer') || text.includes('what you do')) {
      return 'We offer Custom Software Development, Mobile Apps (React Native), Cloud Integration (AWS & Docker), and database engineering (PostgreSQL). You can see details on our Services tab!';
    }
    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('address')) {
      return 'You can contact us via our Contact form, or email us at nechtechnology7@gmail.com. We also offer quick consultation booking!';
    }
    if (text.includes('portfolio') || text.includes('project') || text.includes('work')) {
      return 'We have built systems like School ERPs, Hospital Portals, and modern E-Commerce hubs. Check out the Portfolio section on our page!';
    }
    if (text.includes('price') || text.includes('cost') || text.includes('quote')) {
      return 'We offer custom, startup-friendly pricing. You can use our "Get a Quote" form on the homepage or contact section to receive a tailormade estimation!';
    }
    if (text.includes('careers') || text.includes('job') || text.includes('hiring') || text.includes('apply')) {
      return 'Yes! We are hiring React Frontend and Node.js Backend developers. Head over to our Careers page to upload your resume directly!';
    }
    return "Thank you for reaching out! For instant human support, you can click the WhatsApp icon below to text us directly, or drop us a message through the contact page.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotResponse(userMsg.text)
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-btn"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="chatbot-window glassmorphism"
          style={{
            width: '360px',
            height: '480px',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            animation: 'fadeInUp 0.3s ease'
          }}
        >
          {/* Header */}
          <div
            className="chat-header"
            style={{
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(8, 145, 178, 0.2))',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Nech AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: 'auto' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="chat-messages"
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 0 14px' : '14px 14px 14px 0',
                  background: m.sender === 'user' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                  border: m.sender === 'user' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* WhatsApp & Live Chat Integration Banner */}
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-around',
              background: 'rgba(0,0,0,0.1)'
            }}
          >
            <a
              href="https://wa.me/916379633873?text=Hello%20Nech%20Technology"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#22c55e',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              <Phone size={14} /> WhatsApp Us
            </a>
            <a
              href="tel:+916379633873"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#06b6d4',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              <MessageCircle size={14} /> Direct Call
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#06b6d4',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Chatbot;
