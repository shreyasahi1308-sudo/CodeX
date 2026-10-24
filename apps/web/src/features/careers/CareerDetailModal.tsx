import React, { useState, useEffect } from 'react';
import { Career, AIExplanation, AIMeta, api } from '../../lib/api';
import { X, Sparkles, BookOpen, ExternalLink, Cpu, Bookmark, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface CareerDetailModalProps {
  career: Career;
  scorePercent?: number;
  userAnswers?: any;
  onClose: () => void;
  onOpenMentor: (career: Career) => void;
  onLaunchSimulation?: (activityId: string) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  scorePercent = 75,
  userAnswers,
  onClose,
  onOpenMentor,
  onLaunchSimulation,
  isSaved,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'ai_fit' | 'day_life'>('roadmap');
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [aiMeta, setAiMeta] = useState<AIMeta | null>(null);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  useEffect(() => {
    async function fetchExplanation() {
      setLoadingAI(true);
      try {
        const res = await api.explainCareer(career.id, userAnswers || {}, scorePercent);
        setExplanation(res.data);
        setAiMeta(res.meta);
      } catch (err) {
        console.error('Failed to get career explanation:', err);
      } finally {
        setLoadingAI(false);
      }
    }

    fetchExplanation();
  }, [career.id]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content animate-fade-in" style={{ padding: '36px' }}>
        {/* Close Button */}
        <button
          id="btn-close-career-modal"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-muted)',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-cluster">{career.clusterName}</span>
            <span className="badge badge-stream">{career.pathways[0]?.streamRequired.split(' ')[0]} Stream</span>
            <span className="badge badge-strong" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile ({career.lastVerified})
            </span>
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            {career.name}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {career.summary}
          </p>
        </div>

        {/* Action Button Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            id="btn-open-gemma-mentor"
            className="btn btn-primary"
            onClick={() => onOpenMentor(career)}
          >
            <Sparkles className="w-4 h-4" />
            Ask Gemma Mentor
          </button>

          {career.trialActivityId && onLaunchSimulation && (
            <button
              id="btn-launch-career-activity"
              className="btn btn-secondary"
              onClick={() => onLaunchSimulation(career.trialActivityId!)}
            >
              <Cpu className="w-4 h-4 text-teal-400" />
              Test-Drive Simulation
            </button>
          )}

          <button
            id="btn-bookmark-career-modal"
            className="btn btn-secondary"
            onClick={onToggleSave}
            style={{ color: isSaved ? '#2dd4bf' : 'var(--text-main)' }}
          >
            <Bookmark className="w-4 h-4" />
            {isSaved ? 'Saved to Bookmarks' : 'Save Career'}
          </button>
        </div>

        {/* Tabs: Roadmap vs AI Fit vs Day in Life */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
          {[
            { id: 'roadmap', label: 'Indian Education Roadmap' },
            { id: 'ai_fit', label: 'Why You Fit (Gemma AI)' },
            { id: 'day_life', label: 'Daily Life & Trade-offs' },
          ].map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary-500)' : '2px solid transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', background: 'rgba(99, 102, 241, 0.05)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-400)', marginBottom: '4px' }}>
                Class 11–12 Eligibility & Stream Requirement:
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>
                {career.pathways[0]?.streamRequired}
              </div>
              {career.pathways[0]?.note && (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-faint)', marginTop: '4px' }}>
                  {career.pathways[0].note}
                </div>
              )}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              Step-by-Step Educational Timeline:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {career.pathways[0]?.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary-600)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{step}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Verified Entrance Exams */}
            {career.pathways[0]?.exams && career.pathways[0].exams.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-teal)' }}>
                  Verified National Entrance Examinations:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                  {career.pathways[0].exams.map((exam, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{exam.name}</div>
                        {exam.frequency && <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>{exam.frequency}</div>}
                      </div>
                      <a
                        href={exam.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--primary-400)' }}
                      >
                        Official Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compensation Benchmark */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '10px' }}>
                Realistic Indian Compensation Benchmarks (CTC in INR):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Entry-Level (0–3 Years):</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80' }}>
                    {career.salaryRange.entry}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Mid-Level (5–8 Years):</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
                    {career.salaryRange.mid}
                  </div>
                </div>
              </div>
              {career.salaryRange.note && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: '8px' }}>
                  * {career.salaryRange.note}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI FIT & PERSONALIZED EXPLANATION */}
        {activeTab === 'ai_fit' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Personalized Fit Analysis</span>
              </div>
              {aiMeta && (
                <span className="badge badge-cluster" style={{ fontSize: '0.7rem' }}>
                  Engine: {aiMeta.model}
                </span>
              )}
            </div>

            {loadingAI ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Synthesizing verified career records and student profile...
              </div>
            ) : explanation ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid var(--primary-500)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>Fit Summary:</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {explanation.summary}
                  </p>
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>Key Interest Drivers:</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {explanation.interest_connections.map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>Reflective Questions to Consider:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {explanation.questions_to_consider.map((q, i) => (
                      <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                        ❓ {q}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(244, 63, 94, 0.05)', borderColor: 'rgba(244, 63, 94, 0.2)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fb7185', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle className="w-4 h-4" /> Transparency & Real Limitations:
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {explanation.limitations}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: DAILY LIFE & TRADE-OFFS */}
        {activeTab === 'day_life' && (
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px' }}>
              What You Actually Do in a Typical Day:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {career.dayInLife.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--primary-400)', fontWeight: 800 }}>•</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5' }}>{item}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '14px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle className="w-4 h-4" /> Candid Reality Checks & Uncertainties:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {career.uncertainties.map((unc, idx) => (
                <div key={idx} style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.25)', fontSize: '0.86rem', color: '#fef08a', lineHeight: '1.5' }}>
                  ⚠️ {unc}
                </div>
              ))}
            </div>

            {/* Official Source Attributions */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-faint)', marginBottom: '8px' }}>
                Verified Official Reference Sources:
              </div>
              {career.sources.map((src, i) => (
                <div key={i} style={{ fontSize: '0.82rem', marginBottom: '6px' }}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-400)', textDecoration: 'none' }}>
                    {src.title} ({src.publisher}) <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
