import React, { useState } from 'react';
import { Career, api } from '../../lib/api';
import { X, Send, Sparkles, User, RefreshCw, HelpCircle } from 'lucide-react';

interface MentorDrawerProps {
  career: Career;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

export const MentorDrawer: React.FC<MentorDrawerProps> = ({ career, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm Gemma, your career counselor for ${career.name}. Ask me anything about Class 11-12 stream combinations, verified national entrance tests, typical work days, or reality checks!`,
      model: 'google/gemma-4-31B-it:novita',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const quickPrompts = [
    'What stream should I pick in Class 11?',
    'What entrance exams are required?',
    'What is the real starter salary in India?',
    'What is the most stressful part of this job?',
  ];

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    const userMsg: Message = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await api.askMentor(career.id, q, history);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          model: res.meta?.model || 'Gemma 4',
        },
      ]);
    } catch (err) {
      console.error('Mentor query failed:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Regarding ${career.name}: Recommended Class 11-12 stream is ${career.pathways[0]?.streamRequired}. Verified exams include ${career.pathways.flatMap(p => p.exams?.map(e => e.name) || []).join(', ') || 'Direct institute merit'}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drawer-right animate-fade-in" role="dialog" aria-modal="true">
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          background: 'var(--accent-yellow)',
          borderBottom: 'var(--border-thick) solid var(--border-ink)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '2px solid var(--border-ink)',
              boxShadow: '2px 2px 0 var(--border-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', textTransform: 'uppercase' }}>Gemma AI Mentor</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--ink-secondary)', fontWeight: 700 }}>
              FOCUS: {career.name}
            </div>
          </div>
        </div>

        <button
          id="btn-close-mentor-drawer"
          onClick={onClose}
          className="btn-brutal btn-white btn-brutal-sm"
          style={{ padding: '6px 8px' }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '90%',
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'var(--accent-lime)',
                    border: '2px solid var(--border-ink)',
                    boxShadow: '2px 2px 0 var(--border-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
              )}

              <div
                className="brutal-card"
                style={{
                  background: isUser ? 'var(--accent-cobalt)' : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : 'var(--ink-primary)',
                  padding: '14px 16px',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {m.content}
                {!isUser && m.model && (
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-muted)', marginTop: '8px', textAlign: 'right' }}>
                    [{m.model.includes('gemma') ? 'GEMMA 4 31B-IT' : 'DETERMINISTIC MENTOR'}]
                  </div>
                )}
              </div>

              {isUser && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'var(--accent-yellow)',
                    border: '2px solid var(--border-ink)',
                    boxShadow: '2px 2px 0 var(--border-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <User className="w-4 h-4 text-black" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--ink-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', paddingLeft: '42px' }}>
            <RefreshCw className="w-4 h-4 animate-spin text-black" />
            Gemma is reasoning with verified career records...
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: '0 20px 12px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {quickPrompts.map((chip, i) => (
          <button
            key={i}
            className="btn-brutal btn-white btn-brutal-sm"
            style={{
              fontSize: '0.74rem',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)',
            }}
            onClick={() => handleSend(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{ padding: '16px 20px', borderTop: 'var(--border-width) solid var(--border-ink)', background: '#FFFFFF' }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex', gap: '10px' }}
        >
          <input
            id="input-mentor-chat"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask Gemma about ${career.name}...`}
            style={{
              flex: 1,
              background: 'var(--bg-page)',
              border: '2px solid var(--border-ink)',
              borderRadius: '6px',
              padding: '10px 14px',
              color: 'var(--ink-primary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none',
            }}
          />
          <button
            id="btn-send-mentor-chat"
            type="submit"
            className="btn-brutal btn-lime btn-brutal-sm"
            disabled={!input.trim() || loading}
            style={{ padding: '10px 16px' }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
