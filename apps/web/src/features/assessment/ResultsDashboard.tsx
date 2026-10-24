import React, { useState } from 'react';
import { RecommendationResponse, ScoredCareer, Career } from '../../lib/api';
import { Sparkles, Layers, BookOpen, Bookmark, Cpu, ArrowRight, RotateCcw, AlertTriangle, Check, ShieldCheck, Zap } from 'lucide-react';

interface ResultsDashboardProps {
  results: RecommendationResponse;
  onSelectCareer: (career: Career, scorePercent: number) => void;
  onLaunchSimulation: (activityId: string) => void;
  onSaveCareer: (careerId: string) => void;
  isCareerSaved: (careerId: string) => boolean;
  onRetake: () => void;
  onCompare: (careerIds: string[]) => void;
}

const RIASEC_META = {
  R: { name: 'Realistic', label: 'Hands-On & Physical', color: 'var(--accent-coral)' },
  I: { name: 'Investigative', label: 'Scientific & Research', color: 'var(--accent-cobalt)' },
  A: { name: 'Artistic', label: 'Creative & Visual', color: 'var(--accent-purple)' },
  S: { name: 'Social', label: 'Helping & Teaching', color: '#16a34a' },
  E: { name: 'Enterprising', label: 'Leading & Business', color: '#d97706' },
  C: { name: 'Conventional', label: 'Organizing & Systems', color: 'var(--accent-cyan)' },
};

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  results,
  onSelectCareer,
  onLaunchSimulation,
  onSaveCareer,
  isCareerSaved,
  onRetake,
  onCompare,
}) => {
  const [streamFilter, setStreamFilter] = useState<string>('all');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setSelectedForCompare(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const filterMatches = (recs: ScoredCareer[]) => {
    if (streamFilter === 'all') return recs;
    return recs.filter(r => {
      const p = r.career.pathways[0]?.streamRequired.toLowerCase() || '';
      if (streamFilter === 'pcm') return p.includes('pcm') || p.includes('math');
      if (streamFilter === 'pcb') return p.includes('pcb') || p.includes('biology');
      if (streamFilter === 'commerce') return p.includes('commerce') || p.includes('math');
      if (streamFilter === 'humanities') return p.includes('any stream') || p.includes('humanities');
      if (streamFilter === 'design') return r.career.cluster === 'design-creative-tech';
      return true;
    });
  };

  const filteredMain = filterMatches(results.mainRecommendations);
  const filteredStretch = filterMatches(results.stretchRecommendations);

  return (
    <div className="container animate-fade-in" style={{ padding: '30px 0 80px 0' }}>
      {/* Top Header & Fast Controls */}
      <div
        className="brutal-card card-lime"
        style={{
          padding: '28px 32px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <span className="sticker sticker-coral">RECOMMENDATION MATRIX</span>
            <span className="stamp">DETERMINISTIC RIASEC v1.0</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
            Your Tailored Career Shortlist
          </h1>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink-primary)', marginTop: '4px' }}>
            Ranked by similarity with your real activity ratings, favored subjects, and chosen work settings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {selectedForCompare.length >= 2 && (
            <button
              id="btn-compare-selected"
              className="btn-brutal btn-cobalt"
              onClick={() => onCompare(selectedForCompare)}
            >
              <Layers className="w-4 h-4" /> Compare Shortlist ({selectedForCompare.length})
            </button>
          )}

          <button id="btn-retake-quiz" className="btn-brutal btn-white" onClick={onRetake}>
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      </div>

      {/* Flat Profile Warning Banner */}
      {results.flags.flatProfile && (
        <div
          className="brutal-card card-yellow"
          style={{
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <AlertTriangle className="w-5 h-5 text-black shrink-0" />
          <div>
            <strong>BALANCED PROFILE DETECTED:</strong> You gave similar ratings across several areas. We have surfaced diverse stretch recommendations so you can test real tasks in the Simulations lab!
          </div>
        </div>
      )}

      {/* Section 1: RIASEC Bento Scorecard */}
      <div className="brutal-card" style={{ padding: '28px', background: '#FFFFFF', marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="sticker sticker-cyan" style={{ marginBottom: '6px' }}>HOLLAND INVENTORY</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase' }}>
              Your 6-Dimensional RIASEC Affinity Profile
            </h2>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
            [RANGE: 0% LOW TO 100% HIGH ENJOYMENT]
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {(['R', 'I', 'A', 'S', 'E', 'C'] as const).map(dim => {
            const val = results.riasecScores[dim] || 0;
            const pct = Math.round(val * 100);
            const meta = RIASEC_META[dim];
            return (
              <div
                key={dim}
                style={{
                  background: 'var(--bg-page)',
                  border: '2px solid var(--border-ink)',
                  borderRadius: '10px',
                  padding: '14px',
                  boxShadow: '2px 2px 0 var(--border-ink)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>{meta.name}</span>
                  <span className="sticker sticker-lime" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginBottom: '10px', fontWeight: 500 }}>
                  {meta.label}
                </div>
                <div style={{ width: '100%', height: '8px', background: '#E5E2D6', border: '1.5px solid var(--border-ink)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: meta.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stream Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '6px' }}>
        {[
          { id: 'all', label: '★ ALL STREAMS' },
          { id: 'pcm', label: 'SCIENCE (PCM)' },
          { id: 'pcb', label: 'SCIENCE (PCB)' },
          { id: 'commerce', label: 'COMMERCE' },
          { id: 'humanities', label: 'HUMANITIES & ARTS' },
          { id: 'design', label: 'DESIGN & TECH' },
        ].map(filter => (
          <button
            key={filter.id}
            id={`filter-stream-${filter.id}`}
            onClick={() => setStreamFilter(filter.id)}
            className={`btn-brutal ${streamFilter === filter.id ? 'btn-cobalt' : 'btn-white'} btn-brutal-sm`}
            style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Section 2: Primary Recommended Careers */}
      <div style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span className="sticker sticker-coral">TOP MATCHES</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>
            Primary Career Recommendations ({filteredMain.length})
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredMain.map((rec, index) => {
            const isSaved = isCareerSaved(rec.career.id);
            const isSelected = selectedForCompare.includes(rec.career.id);

            return (
              <div
                key={rec.career.id}
                id={`card-career-${rec.career.id}`}
                className="brutal-card"
                style={{
                  padding: '26px',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderWidth: '3px',
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="sticker sticker-lime">
                        #{index + 1} · {rec.scorePercent}% MATCH
                      </span>
                      <span className="stamp">
                        {rec.band}
                      </span>
                    </div>

                    <button
                      id={`btn-save-${rec.career.id}`}
                      onClick={() => onSaveCareer(rec.career.id)}
                      className={`btn-brutal ${isSaved ? 'btn-lime' : 'btn-white'} btn-brutal-sm`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save this career'}
                      style={{ padding: '6px 10px' }}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {rec.career.name}
                  </h3>

                  <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '18px', fontWeight: 500 }}>
                    {rec.career.summary}
                  </p>

                  {/* Why Recommended Reasons */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      [WHY RECOMMENDED FOR YOU]
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {rec.reasons.slice(0, 2).map((r, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: '0.82rem',
                            background: 'var(--bg-page)',
                            border: '1.5px solid var(--border-ink)',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontWeight: 600,
                          }}
                        >
                          <strong style={{ color: 'var(--accent-cobalt)' }}>{r.label}:</strong> {r.detail}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indian Compensation Benchmark */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      background: 'var(--accent-yellow)',
                      border: '2px solid var(--border-ink)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      marginBottom: '18px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>STARTER CTC</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>{rec.career.salaryRange.entry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>MID-CAREER</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>{rec.career.salaryRange.mid}</div>
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div style={{ borderTop: '2px solid var(--border-ink)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      id={`btn-view-${rec.career.id}`}
                      className="btn-brutal btn-cobalt btn-brutal-sm"
                      style={{ flex: 1 }}
                      onClick={() => onSelectCareer(rec.career, rec.scorePercent)}
                    >
                      <BookOpen className="w-4 h-4" />
                      Roadmap & Details
                    </button>

                    {rec.career.trialActivityId && (
                      <button
                        id={`btn-trial-${rec.career.id}`}
                        className="btn-brutal btn-lime btn-brutal-sm"
                        onClick={() => onLaunchSimulation(rec.career.trialActivityId!)}
                        title="Try a 5-minute interactive task from this career"
                      >
                        <Cpu className="w-4 h-4" />
                        Try Activity
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      id={`btn-toggle-compare-${rec.career.id}`}
                      onClick={() => toggleCompare(rec.career.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isSelected ? 'var(--accent-cobalt)' : 'var(--ink-muted)',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      {isSelected ? '✓ SELECTED FOR COMPARE' : '+ ADD TO COMPARE'}
                    </button>

                    <span className="stamp" style={{ fontSize: '0.68rem' }}>
                      {rec.career.pathways[0]?.streamRequired.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Stretch Recommendations */}
      {filteredStretch.length > 0 && (
        <div style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="sticker sticker-purple">EXPLORE BEYOND THE FAMILIAR</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              High enjoyment potential in unfamiliar clusters
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
            Stretch Recommendations
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            {filteredStretch.map(rec => (
              <div
                key={rec.career.id}
                className="brutal-card card-yellow"
                style={{
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="sticker sticker-coral">{rec.scorePercent}% MATCH · STRETCH</span>
                    <span className="stamp">{rec.career.clusterName}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {rec.career.name}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--ink-primary)', lineHeight: '1.5', marginBottom: '16px', fontWeight: 500 }}>
                    {rec.career.summary}
                  </p>
                </div>

                <div style={{ borderTop: '2px solid var(--border-ink)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    className="btn-brutal btn-white btn-brutal-sm"
                    onClick={() => onSelectCareer(rec.career, rec.scorePercent)}
                  >
                    Explore Pathway <ArrowRight className="w-4 h-4" />
                  </button>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>
                    {rec.career.salaryRange.entry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
