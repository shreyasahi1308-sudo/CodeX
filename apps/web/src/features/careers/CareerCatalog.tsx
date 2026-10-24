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
    { id: 'all', label: '★ ALL FIELDS' },
    { id: 'data-computing', label: 'DATA & TECH' },
    { id: 'health-life-sciences', label: 'HEALTH & SCIENCE' },
    { id: 'engineering-making', label: 'ENGINEERING' },
    { id: 'business-finance', label: 'BUSINESS & FINANCE' },
    { id: 'design-creative-tech', label: 'DESIGN & CREATIVE' },
    { id: 'law-public-service', label: 'LAW & CIVIL SERVICE' },
    { id: 'media-communication', label: 'MEDIA & MARKETING' },
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '30px 0 80px 0' }}>
      <div
        className="brutal-card card-yellow"
        style={{
          padding: '28px 32px',
          marginBottom: '28px',
        }}
      >
        <span className="sticker sticker-cobalt" style={{ marginBottom: '8px' }}>
          OFFICIAL INDIAN CAREER DIRECTORY
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
          Browse 15+ Verified Career Profiles
        </h1>
        <p style={{ color: 'var(--ink-primary)', fontSize: '0.95rem', marginTop: '4px', fontWeight: 600 }}>
          Comprehensive education roadmaps, verified entrance tests, and realistic salary data for Classes 9–12.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search className="w-5 h-5 text-black" style={{ position: 'absolute', left: '16px', top: '15px' }} />
          <input
            id="input-search-careers"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by job title, subject, exam (e.g. JEE, CLAT, Design)..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '2.5px solid var(--border-ink)',
              boxShadow: '3px 3px 0 var(--border-ink)',
              color: 'var(--ink-primary)',
              fontSize: '0.95rem',
              fontWeight: 600,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Cluster Pills */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px' }}>
        {clusters.map(c => (
          <button
            key={c.id}
            id={`cluster-${c.id}`}
            onClick={() => setSelectedCluster(c.id)}
            className={`btn-brutal ${selectedCluster === c.id ? 'btn-cobalt' : 'btn-white'} btn-brutal-sm`}
            style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid of Careers */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ink-secondary)', fontFamily: 'var(--font-mono)' }}>
          <RefreshCw className="w-8 h-8 animate-spin text-black" style={{ margin: '0 auto 16px auto' }} />
          LOADING CAREER DIRECTORY...
        </div>
      ) : careers.length === 0 ? (
        <div className="brutal-card" style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>No careers found matching "{search}"</div>
          <p style={{ color: 'var(--ink-muted)', marginTop: '6px' }}>Try searching for a different subject or keyword.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {careers.map(career => {
            const isSaved = isCareerSaved(career.id);
            return (
              <div
                key={career.id}
                className="brutal-card"
                style={{
                  padding: '26px',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className="sticker sticker-lime">{career.clusterName}</span>
                      <span className="stamp">{career.pathways[0]?.streamRequired.split(' ')[0]}</span>
                    </div>

                    <button
                      onClick={() => onSaveCareer(career.id)}
                      className={`btn-brutal ${isSaved ? 'btn-lime' : 'btn-white'} btn-brutal-sm`}
                      title={isSaved ? 'Saved' : 'Save career'}
                      style={{ padding: '6px 10px' }}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {career.name}
                  </h3>

                  <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '18px', fontWeight: 500 }}>
                    {career.summary}
                  </p>

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
                      <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>{career.salaryRange.entry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>MID-CAREER</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>{career.salaryRange.mid}</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '2px solid var(--border-ink)', paddingTop: '16px', display: 'flex', gap: '10px' }}>
                  <button
                    id={`btn-catalog-view-${career.id}`}
                    className="btn-brutal btn-cobalt btn-brutal-sm"
                    style={{ flex: 1 }}
                    onClick={() => onSelectCareer(career)}
                  >
                    <BookOpen className="w-4 h-4" /> Roadmap & Details
                  </button>

                  {career.trialActivityId && (
                    <button
                      className="btn-brutal btn-lime btn-brutal-sm"
                      onClick={() => onLaunchSimulation(career.trialActivityId!)}
                      title="Try 5-minute interactive task"
                    >
                      <Cpu className="w-4 h-4" /> Try
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
