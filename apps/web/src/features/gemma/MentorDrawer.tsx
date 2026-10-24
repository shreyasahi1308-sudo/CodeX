import React, { useState, useRef, useEffect } from 'react';
import { Career, api } from '../../lib/api';
import { X, Send, Sparkles, User, RefreshCw, RotateCcw, AlertTriangle, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

interface MentorDrawerProps {
  career?: Career | null;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  isError?: boolean;
}

export const MentorDrawer: React.FC<MentorDrawerProps> = ({ career, onClose }) => {
  const getInitialWelcome = (): string => {
    if (career) {
      return `Namaste! I'm Gemma, your career counselor for ${career.name}. Ask me anything about Class 11-12 stream combinations, verified national entrance tests, typical work days, or reality checks!`;
    }
    return `Namaste! I'm Gemma, your AI career exploration mentor for Classes 9–12. I'm here to help you navigate stream choices (Science, Commerce, Humanities), entrance exams, degree pathways, or how to prepare for careers without expensive coaching. What's on your mind today?`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: getInitialWelcome(),
      model: 'google/gemma-4-31B-it:novita',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [lastFailedQuestion, setLastFailedQuestion] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const generalPrompts = [
    'How do I decide between Science, Commerce, and Humanities?',
    'What careers combine creativity and technology?',
    'What can I do after Class 12 besides engineering?',
    'Help me compare two careers.',
    'How can I prepare for a career without expensive coaching?',
  ];

  const careerPrompts = [
    'What stream should I pick in Class 11?',
    'What entrance exams are required?',
    'What is the real starter salary in India?',
    'What is the most stressful part of this job?',
  ];

  const quickPrompts = career ? careerPrompts : generalPrompts;

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    const userMsg: Message = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setLastFailedQuestion(null);

    try {
      const history = messages
        .filter(m => !m.isError)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await api.askMentor(career?.id || null, q, history);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          model: res.meta?.model || 'Gemma 4',
        },
      ]);
    } catch (err: any) {
      console.error('Mentor query failed:', err);
      setLastFailedQuestion(q);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Unable to complete inference request (${err.message || 'Network error'}). You can try asking again or click Retry below.`,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: getInitialWelcome(),
        model: 'google/gemma-4-31B-it:novita',
      },
    ]);
    setInput('');
    setLastFailedQuestion(null);
  };

  return (
    <div className="drawer-right animate-fade-in" role="dialog" aria-modal="true">
      {/* Header */}
      <div
        style={{
          padding: '18px 24px',
          background: 'var(--accent-yellow)',
          borderBottom: 'var(--border-thick) solid var(--border-ink)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 0 var(--border-ink)',
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
            <Sparkles className="w-5 h-5 text-ink-primary" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.1rem', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              Interactive Career Mentor
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-secondary)', fontWeight: 700 }}>
              {career ? `FOCUS: ${career.name.toUpperCase()}` : 'POWERED BY GEMMA 4 (31B-IT)'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            id="btn-reset-mentor-chat"
            onClick={handleResetChat}
            className="btn-brutal btn-white btn-brutal-sm"
            title="Start a new chat conversation"
            style={{ padding: '6px 10px' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span style={{ fontSize: '0.75rem' }}>New Chat</span>
          </button>

          <button
            id="btn-close-mentor-drawer"
            onClick={onClose}
            className="btn-brutal btn-white btn-brutal-sm"
            style={{ padding: '6px 8px' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                maxWidth: isUser ? '85%' : '92%',
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: m.isError ? 'var(--accent-coral)' : 'var(--accent-lime)',
                    border: '2px solid var(--border-ink)',
                    boxShadow: '2px 2px 0 var(--border-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {m.isError ? (
                    <AlertTriangle className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-ink-primary" />
                  )}
                </div>
              )}

              <div
                className="brutal-card"
                style={{
                  background: isUser ? 'var(--accent-cobalt)' : m.isError ? '#FFF1F2' : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : 'var(--ink-primary)',
                  borderColor: m.isError ? '#E11D48' : 'var(--border-ink)',
                  padding: '14px 18px',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  fontWeight: 500,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.content}

                {!isUser && !m.isError && (
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      color: 'var(--ink-muted)',
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(18, 18, 18, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>
                      {m.model?.includes('gemma')
                        ? '✦ GEMMA 4 31B-IT (LIVE ROUTER)'
                        : '✦ DETERMINISTIC COUNSELOR FALLBACK'}
                    </span>
                    <span style={{ color: 'var(--ink-muted)', fontWeight: 500 }}>
                      Indian Classes 9–12 Context
                    </span>
                  </div>
                )}

                {m.isError && lastFailedQuestion && (
                  <div style={{ marginTop: '10px' }}>
                    <button
                      className="btn-brutal btn-lime btn-brutal-sm"
                      onClick={() => handleSend(lastFailedQuestion)}
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retry Question
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
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
                  <User className="w-4 h-4 text-ink-primary" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div
            className="brutal-card-static"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              alignSelf: 'flex-start',
              marginLeft: '44px',
              background: '#FFFFFF',
              fontSize: '0.86rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-primary)',
            }}
          >
            <RefreshCw className="w-4 h-4 animate-spin text-cobalt" />
            <span>Gemma 4 is reasoning through verified career records...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Questions (Chips) */}
      <div
        style={{
          padding: '10px 20px',
          borderTop: '1px solid #E5E2D6',
          background: 'var(--bg-surface-alt)',
        }}
      >
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '8px' }}>
          Suggested Starter Questions:
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {quickPrompts.map((chip, i) => (
            <button
              key={i}
              className="btn-brutal btn-white btn-brutal-sm"
              style={{
                fontSize: '0.76rem',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                textAlign: 'left',
              }}
              onClick={() => handleSend(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div style={{ padding: '16px 20px', borderTop: 'var(--border-width) solid var(--border-ink)', background: '#FFFFFF' }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}
        >
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              id="input-mentor-chat"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              maxLength={1000}
              placeholder={
                career
                  ? `Ask Gemma about ${career.name} (streams, entrance tests, reality checks)...`
                  : 'Ask Gemma about streams, exams, skills, or career pathways (Enter to send, Shift+Enter for newline)...'
              }
              style={{
                width: '100%',
                background: 'var(--bg-page)',
                border: '2px solid var(--border-ink)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: 'var(--ink-primary)',
                fontSize: '0.88rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                outline: 'none',
                resize: 'none',
                boxShadow: 'inset 1px 1px 0px rgba(0,0,0,0.05)',
              }}
            />
          </div>

          <button
            id="btn-send-mentor-chat"
            type="submit"
            className="btn-brutal btn-lime"
            disabled={!input.trim() || loading}
            style={{ padding: '14px 20px', height: '56px' }}
            title="Send message (Enter)"
          >
            <Send className="w-5 h-5 text-ink-primary" />
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.72rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Minor Safe · No Personal Data Saved
          </span>
          <span>{input.length}/1000</span>
        </div>
      </div>
    </div>
  );
};
