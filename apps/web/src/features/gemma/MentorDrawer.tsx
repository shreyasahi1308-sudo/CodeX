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
      content: `Hi! I'm Gemma, your career mentor for ${career.name}. Ask me anything about Class 11-12 stream choices, verified entrance exams, day-to-day work reality, or industry trade-offs!`,
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
          content: `Regarding ${career.name}: Recommended stream is ${career.pathways[0]?.streamRequired}. Verified exams include ${career.pathways.flatMap(p => p.exams?.map(e => e.name) || []).join(', ') || 'Direct merit'}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drawer-right animate-fade-in" role="dialog" aria-modal="true">
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff' }}>Gemma Mentor</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Focus: {career.name}</div>
          </div>
        </div>

        <button
          id="btn-close-mentor-drawer"
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
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
                maxWidth: '88%',
              }}
            >
              {!isUser && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div
                style={{
                  background: isUser ? 'var(--primary-600)' : 'rgba(255, 255, 255, 0.05)',
                  color: isUser ? '#ffffff' : 'var(--text-main)',
                  padding: '12px 16px',
                  borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  border: isUser ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                }}
              >
                {m.content}
                {!isUser && m.model && (
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)', marginTop: '6px', textAlign: 'right' }}>
                    {m.model.includes('gemma') ? 'Gemma 4 (31B-it)' : 'Deterministic Mentor'}
                  </div>
                )}
              </div>

              {isUser && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-faint)', fontSize: '0.82rem', paddingLeft: '38px' }}>
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            Gemma is reasoning with verified career records...
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: '0 20px 12px 20px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {quickPrompts.map((chip, i) => (
          <button
            key={i}
            className="btn btn-ghost btn-sm"
            style={{
              fontSize: '0.75rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              whiteSpace: 'nowrap',
              borderRadius: '16px',
            }}
            onClick={() => handleSend(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(9, 13, 22, 0.8)' }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex', gap: '8px' }}
        >
          <input
            id="input-mentor-chat"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask Gemma about ${career.name}...`}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none',
            }}
          />
          <button
            id="btn-send-mentor-chat"
            type="submit"
            className="btn btn-primary"
            disabled={!input.trim() || loading}
            style={{ padding: '10px 14px' }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
