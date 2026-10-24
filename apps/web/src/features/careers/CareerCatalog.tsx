import React, { useState, useEffect } from 'react';
import { api, Career } from '../../lib/api';
import { Search, BookOpen, Bookmark, Cpu, ExternalLink, RefreshCw } from 'lucide-react';

interface CareerCatalogProps {
  onSelectCareer: (career: Career) => void;
  onLaunchSimulation: (activityId: string) => void;
  onSaveCareer: (careerId: string) => void;
  isCareerSaved: (careerId: string) => boolean;
}

export const CareerCatalog: React.FC<CareerCatalogProps> = ({
  onSelectCareer,
  onLaunchSimulation,
  onSaveCareer,
  isCareerSaved,
}) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  useEffect(() => {
    async function loadCareers() {
      setLoading(true);
      try {
        const clusterParam = selectedCluster === 'all' ? undefined : selectedCluster;
        const data = await api.getCareers(search, clusterParam);
        setCareers(data);
      } catch (err) {
        console.error('Failed to load careers:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadCareers();
    }, 200);

    return () => clearTimeout(timer);
  }, [search, selectedCluster]);

  const clusters = [
    { id: 'all', label: 'All Fields' },
    { id: 'data-computing', label: 'Data & Tech' },
    { id: 'health-life-sciences', label: 'Health & Science' },
    { id: 'engineering-making', label: 'Engineering' },
    { id: 'business-finance', label: 'Business & Finance' },
    { id: 'design-creative-tech', label: 'Design & Creative' },
    { id: 'law-public-service', label: 'Law & Civil Service' },
    { id: 'media-communication', label: 'Media & Marketing' },
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-cluster" style={{ marginBottom: '8px' }}>
          Official Indian Career Directory
        </span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Browse 15+ Verified Career Profiles</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Comprehensive education roadmaps, verified entrance tests, and realistic salary data for Classes 9–12.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search className="w-4 h-4 text-slate-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
          <input
            id="input-search-careers"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by job title, subject, exam (e.g. JEE, CLAT, Design)..."
            style={{
              width: '100%',
              padding: '12px 14px 12px 42px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Cluster Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px' }}>
        {clusters.map(c => (
          <button
            key={c.id}
            id={`cluster-${c.id}`}
            onClick={() => setSelectedCluster(c.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: selectedCluster === c.id ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
              background: selectedCluster === c.id ? 'var(--primary-600)' : 'rgba(255, 255, 255, 0.04)',
              color: selectedCluster === c.id ? '#ffffff' : 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid of Careers */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-400" style={{ margin: '0 auto 16px auto' }} />
          Loading careers catalog...
        </div>
      ) : careers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          No careers found matching "{search}". Try searching for another keyword.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {careers.map(career => {
            const isSaved = isCareerSaved(career.id);
            return (
              <div
                key={career.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-cluster">{career.clusterName}</span>
                      <span className="badge badge-stream">{career.pathways[0]?.streamRequired.split(' ')[0]}</span>
                    </div>

                    <button
                      onClick={() => onSaveCareer(career.id)}
                      title={isSaved ? 'Saved' : 'Save career'}
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
                    {career.name}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {career.summary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '16px' }}>
                    <div>
                      <span style={{ color: 'var(--text-faint)' }}>Starter: </span>
                      <strong style={{ color: '#4ade80' }}>{career.salaryRange.entry}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-faint)' }}>Mid-Career: </span>
                      <strong style={{ color: '#38bdf8' }}>{career.salaryRange.mid}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', gap: '8px' }}>
                  <button
                    id={`btn-catalog-view-${career.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onSelectCareer(career)}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Roadmap & Details
                  </button>

                  {career.trialActivityId && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onLaunchSimulation(career.trialActivityId!)}
                      title="Try 5-minute interactive task"
                    >
                      <Cpu className="w-3.5 h-3.5 text-teal-400" /> Try
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
