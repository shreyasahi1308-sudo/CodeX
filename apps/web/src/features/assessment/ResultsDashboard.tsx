import React, { useState } from 'react';
import { RecommendationResponse, ScoredCareer, Career } from '../../lib/api';
import { Sparkles, Layers, BookOpen, Bookmark, Cpu, ArrowRight, RotateCcw, AlertCircle, Check } from 'lucide-react';

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
  R: { name: 'Realistic', label: 'Hands-On & Physical', color: '#f97316' },
  I: { name: 'Investigative', label: 'Scientific & Research', color: '#06b6d4' },
  A: { name: 'Artistic', label: 'Creative & Visual', color: '#ec4899' },
  S: { name: 'Social', label: 'Helping & Teaching', color: '#10b981' },
  E: { name: 'Enterprising', label: 'Leading & Business', color: '#f59e0b' },
  C: { name: 'Conventional', label: 'Organizing & Systems', color: '#8b5cf6' },
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
    <div className="container animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge badge-strong" style={{ marginBottom: '8px' }}>
            Personalized Discovery Matrix
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Your Recommended Career Explorations
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Grounded in your Holland RIASEC scores, academic interests, and preferred work environments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {selectedForCompare.length >= 2 && (
            <button
              id="btn-compare-selected"
              className="btn btn-primary btn-sm"
              onClick={() => onCompare(selectedForCompare)}
            >
              <Layers className="w-4 h-4" /> Compare ({selectedForCompare.length})
            </button>
          )}

          <button id="btn-retake-quiz" className="btn btn-secondary btn-sm" onClick={onRetake}>
            <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
          </button>
        </div>
      </div>

      {/* Profile Health / Flags Banner */}
      {results.flags.flatProfile && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#fbbf24',
            fontSize: '0.88rem',
          }}
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <strong>Balanced / Flat Profile Detected:</strong> You gave similar ratings across several activity types. We have included diverse options and recommend testing real tasks in the Simulations section to discover sharper preferences!
          </div>
        </div>
      )}

      {/* Section 1: RIASEC Interest Profile Card */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Your Holland RIASEC Interest Profile</h2>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-faint)' }}>Normalized from 0% (Low) to 100% (High Affinity)</div>
          </div>
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
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: meta.color }}>{meta.name}</span>
                  <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{pct}%</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', marginBottom: '8px' }}>{meta.label}</div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: meta.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stream Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: 'All Streams' },
          { id: 'pcm', label: 'Science (PCM)' },
          { id: 'pcb', label: 'Science (PCB)' },
          { id: 'commerce', label: 'Commerce' },
          { id: 'humanities', label: 'Humanities & Arts' },
          { id: 'design', label: 'Design & Tech' },
        ].map(filter => (
          <button
            key={filter.id}
            id={`filter-stream-${filter.id}`}
            onClick={() => setStreamFilter(filter.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: streamFilter === filter.id ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
              background: streamFilter === filter.id ? 'var(--primary-600)' : 'rgba(255, 255, 255, 0.05)',
              color: streamFilter === filter.id ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Section 2: Main Recommended Careers */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Primary Matches ({filteredMain.length})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredMain.map(rec => {
            const isSaved = isCareerSaved(rec.career.id);
            const isSelected = selectedForCompare.includes(rec.career.id);

            return (
              <div
                key={rec.career.id}
                className="glass-panel"
                id={`card-career-${rec.career.id}`}
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isSelected ? '1px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className={`badge ${rec.band === 'Strong overlap' ? 'badge-strong' : 'badge-good'}`}>
                        {rec.scorePercent}% Match · {rec.band}
                      </span>
                      <span className="badge badge-cluster">{rec.career.clusterName}</span>
                    </div>

                    <button
                      id={`btn-save-${rec.career.id}`}
                      onClick={() => onSaveCareer(rec.career.id)}
                      title={isSaved ? 'Saved to bookmarks' : 'Save this career'}
                      style={{
                        background: isSaved ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: isSaved ? '1px solid var(--accent-teal)' : '1px solid transparent',
                        color: isSaved ? '#2dd4bf' : 'var(--text-muted)',
                        padding: '6px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
                    {rec.career.name}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {rec.career.summary}
                  </p>

                  {/* Why recommended reasons */}
                  <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                      Why Recommended:
                    </div>
                    {rec.reasons.slice(0, 2).map((r, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          borderLeft: '3px solid var(--primary-500)',
                        }}
                      >
                        <strong>{r.label}:</strong> {r.detail}
                      </div>
                    ))}
                  </div>

                  {/* Indian Salary Benchmark */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '16px' }}>
                    <div>
                      <span style={{ color: 'var(--text-faint)' }}>Starter: </span>
                      <strong style={{ color: '#4ade80' }}>{rec.career.salaryRange.entry}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-faint)' }}>Mid-Career: </span>
                      <strong style={{ color: '#38bdf8' }}>{rec.career.salaryRange.mid}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      id={`btn-view-${rec.career.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => onSelectCareer(rec.career, rec.scorePercent)}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Roadmap & Details
                    </button>

                    {rec.career.trialActivityId && (
                      <button
                        id={`btn-trial-${rec.career.id}`}
                        className="btn btn-secondary btn-sm"
                        onClick={() => onLaunchSimulation(rec.career.trialActivityId!)}
                        title="Try a 5-minute interactive task from this career"
                      >
                        <Cpu className="w-3.5 h-3.5 text-teal-400" />
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
                        color: isSelected ? 'var(--accent-teal)' : 'var(--text-faint)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Layers className="w-3 h-3" />
                      {isSelected ? 'Selected for comparison' : '+ Add to compare'}
                    </button>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                      Class 11: {rec.career.pathways[0]?.streamRequired.split(' ')[0] || 'Any'}
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
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-stretch">Explore Outside Your Box</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>High enjoyment potential in unfamiliar clusters</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px' }}>
            Stretch Recommendations
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            {filteredStretch.map(rec => (
              <div
                key={rec.career.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  background: 'rgba(245, 158, 11, 0.03)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-stretch">{rec.scorePercent}% Match · Stretch Discovery</span>
                    <span className="badge badge-cluster">{rec.career.clusterName}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff' }}>
                    {rec.career.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: '1.5', marginBottom: '14px' }}>
                    {rec.career.summary}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onSelectCareer(rec.career, rec.scorePercent)}
                  >
                    Explore Pathway <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>
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
