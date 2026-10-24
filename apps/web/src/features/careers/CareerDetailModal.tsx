import React, { useState, useEffect } from 'react';
import { Career, AIExplanation, AIMeta, api } from '../../lib/api';
import { X, Sparkles, BookOpen, ExternalLink, Cpu, Bookmark, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

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
          className="btn-brutal btn-white btn-brutal-sm"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '6px 8px',
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="sticker sticker-lime">{career.clusterName}</span>
            <span className="sticker sticker-cyan">{career.pathways[0]?.streamRequired.split(' ')[0]} STREAM</span>
            <span className="stamp">
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-green-700" />
              VERIFIED {career.lastVerified}
            </span>
          </div>

          <h2 style={{ fontSize: '2.1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '-0.03em' }}>
            {career.name}
          </h2>

          <p style={{ color: 'var(--ink-secondary)', fontSize: '1rem', lineHeight: '1.6', fontWeight: 500 }}>
            {career.summary}
          </p>
        </div>

        {/* Action Button Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button
            id="btn-open-gemma-mentor"
            className="btn-brutal btn-cobalt"
            onClick={() => onOpenMentor(career)}
          >
            <Sparkles className="w-4 h-4" />
            Ask Gemma Mentor (AI)
          </button>

          {career.trialActivityId && onLaunchSimulation && (
            <button
              id="btn-launch-career-activity"
              className="btn-brutal btn-lime"
              onClick={() => onLaunchSimulation(career.trialActivityId!)}
            >
              <Cpu className="w-4 h-4" />
              Test-Drive Simulation (5 mins)
            </button>
          )}

          <button
            id="btn-bookmark-career-modal"
            className={`btn-brutal ${isSaved ? 'btn-yellow' : 'btn-white'}`}
            onClick={onToggleSave}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            {isSaved ? 'Saved in Shortlist' : 'Save to Shortlist'}
          </button>
        </div>

        {/* Tabs: Roadmap vs AI Fit vs Day in Life */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '2.5px solid var(--border-ink)', paddingBottom: '12px', marginBottom: '28px' }}>
          {[
            { id: 'roadmap', label: '1. INDIAN EDUCATION ROADMAP' },
            { id: 'ai_fit', label: '2. WHY YOU FIT (GEMMA 4)' },
            { id: 'day_life', label: '3. DAILY LIFE & REALITY CHECKS' },
          ].map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn-brutal ${activeTab === tab.id ? 'btn-yellow' : 'btn-white'} btn-brutal-sm`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div>
            <div className="brutal-card card-lime" style={{ padding: '20px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                [CLASS 11–12 STREAM ELIGIBILITY]
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>
                {career.pathways[0]?.streamRequired}
              </div>
              {career.pathways[0]?.note && (
                <div style={{ fontSize: '0.82rem', marginTop: '6px', fontWeight: 600 }}>
                  * {career.pathways[0].note}
                </div>
              )}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>
              Educational Milestones Timeline:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {career.pathways[0]?.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--ink-primary)',
                      color: '#ffffff',
                      border: '2px solid var(--border-ink)',
                      boxShadow: '2px 2px 0 var(--border-ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.92rem',
                      flexShrink: 0,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div className="brutal-card" style={{ flex: 1, padding: '14px 18px', background: '#FFFFFF' }}>
                    <div style={{ fontSize: '0.94rem', fontWeight: 600, lineHeight: '1.5' }}>{step}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Verified Entrance Exams */}
            {career.pathways[0]?.exams && career.pathways[0].exams.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '14px' }}>
                  Verified National Entrance Examinations:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  {career.pathways[0].exams.map((exam, i) => (
                    <div
                      key={i}
                      className="brutal-card"
                      style={{
                        padding: '16px',
                        background: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{exam.name}</div>
                        {exam.frequency && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                            {exam.frequency}
                          </div>
                        )}
                      </div>
                      <a
                        href={exam.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-brutal btn-yellow btn-brutal-sm"
                      >
                        Official Site <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compensation Benchmark */}
            <div className="brutal-card card-yellow" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '10px' }}>
                [REALISTIC INDIAN COMPENSATION BENCHMARKS (INR CTC)]
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-secondary)' }}>Entry-Level (0–3 Years):</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                    {career.salaryRange.entry}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-secondary)' }}>Mid-Level (5–8 Years):</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                    {career.salaryRange.mid}
                  </div>
                </div>
              </div>
              {career.salaryRange.note && (
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', marginTop: '10px', fontWeight: 600 }}>
                  * {career.salaryRange.note}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI FIT & PERSONALIZED EXPLANATION */}
        {activeTab === 'ai_fit' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  Personalized Fit Analysis
                </h3>
              </div>
              {aiMeta && (
                <span className="stamp">
                  ENGINE: {aiMeta.model}
                </span>
              )}
            </div>

            {loadingAI ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-secondary)', fontFamily: 'var(--font-mono)' }}>
                Synthesizing verified career records with student profile...
              </div>
            ) : explanation ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="brutal-card card-lime" style={{ padding: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px' }}>
                    [FIT SUMMARY]
                  </div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.6' }}>
                    {explanation.summary}
                  </p>
                </div>

                <div className="brutal-card" style={{ padding: '20px', background: '#FFFFFF' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '10px' }}>
                    [KEY INTEREST DRIVERS]
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {explanation.interest_connections.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                        <span className="sticker sticker-coral" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="brutal-card" style={{ padding: '20px', background: '#FFFFFF' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '10px' }}>
                    [REFLECTIVE QUESTIONS TO CONSIDER]
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {explanation.questions_to_consider.map((q, i) => (
                      <div key={i} style={{ background: 'var(--bg-page)', border: '1.5px solid var(--border-ink)', padding: '12px 14px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
                        ❓ {q}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="brutal-card card-coral" style={{ padding: '18px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '4px' }}>
                    [TRANSPARENCY & LIMITATIONS]
                  </div>
                  <div style={{ fontSize: '0.86rem', lineHeight: '1.5' }}>
                    {explanation.limitations}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: DAILY LIFE & REALITY CHECKS */}
        {activeTab === 'day_life' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '14px' }}>
              What You Actually Do in a Typical Day:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {career.dayInLife.map((item, idx) => (
                <div key={idx} className="brutal-card" style={{ padding: '16px', background: '#FFFFFF', display: 'flex', gap: '12px' }}>
                  <span style={{ color: 'var(--accent-cobalt)', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>0{idx + 1}.</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, lineHeight: '1.5' }}>{item}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '14px', color: '#b91c1c' }}>
              Candid Reality Checks & Uncertainties:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {career.uncertainties.map((unc, idx) => (
                <div key={idx} className="brutal-card card-yellow" style={{ padding: '14px 18px', fontSize: '0.9rem', fontWeight: 600, lineHeight: '1.5' }}>
                  ⚠️ {unc}
                </div>
              ))}
            </div>

            {/* Official Source Attributions */}
            <div style={{ borderTop: '2px solid var(--border-ink)', paddingTop: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--ink-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                [VERIFIED OFFICIAL REFERENCE SOURCES]
              </div>
              {career.sources.map((src, i) => (
                <div key={i} style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cobalt)', fontWeight: 700, textDecoration: 'none' }}>
                    {src.title} ({src.publisher}) <ExternalLink className="w-3.5 h-3.5 inline" />
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
