import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { X, Layers, RefreshCw, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ComparisonModalProps {
  careerIds: string[];
  onClose: () => void;
  onSelectCareer: (careerId: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  careerIds,
  onClose,
  onSelectCareer,
}) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadComparison() {
      try {
        const res = await api.compareCareers(careerIds);
        setData(res);
      } catch (err) {
        console.error('Failed to compare careers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComparison();
  }, [careerIds]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content animate-fade-in" style={{ padding: '36px', maxWidth: '1040px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="sticker sticker-cobalt">
                <Layers className="w-3.5 h-3.5" />
                SIDE-BY-SIDE MATRIX
              </span>
              <span className="stamp">ACADEMIC BENCHMARKS</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Compare Educational & Career Pathways
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
              Side-by-side analysis of stream requirements, entrance exams, degree duration, and verified Indian entry compensation.
            </p>
          </div>

          <button
            id="btn-close-compare-modal"
            onClick={onClose}
            className="btn-brutal btn-white btn-brutal-sm"
            style={{ padding: '8px 12px' }}
          >
            <X className="w-5 h-5 text-ink-primary" />
          </button>
        </div>

        {loading ? (
          <div className="brutal-card-static" style={{ padding: '50px', textAlign: 'center', background: '#FFFFFF' }}>
            <RefreshCw className="w-8 h-8 animate-spin text-cobalt" style={{ margin: '0 auto 16px auto' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem' }}>
              Synthesizing Comparison Matrix...
            </div>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
              Querying verified curriculum pathways and national compensation databases
            </p>
          </div>
        ) : data && data.careers ? (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0',
                textAlign: 'left',
                fontSize: '0.9rem',
                border: 'var(--border-width) solid var(--border-ink)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <thead>
                <tr style={{ background: 'var(--bg-surface-alt)', borderBottom: 'var(--border-width) solid var(--border-ink)' }}>
                  <th style={{ padding: '16px', width: '22%', borderRight: 'var(--border-width) solid var(--border-ink)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-secondary)' }}>
                    Pathway Dimension
                  </th>
                  {data.careers.map((c: any) => (
                    <th
                      key={c.id}
                      style={{
                        padding: '16px',
                        width: `${78 / data.careers.length}%`,
                        borderRight: 'var(--border-width) solid var(--border-ink)',
                        verticalAlign: 'top',
                      }}
                    >
                      <div className="sticker sticker-yellow" style={{ fontSize: '0.7rem', marginBottom: '6px' }}>
                        {c.clusterName}
                      </div>
                      <div style={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--ink-primary)', lineHeight: '1.3' }}>
                        {c.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Stream */}
                <tr style={{ borderBottom: '1px solid #E5E2D6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    Class 11–12 Stream
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)', fontWeight: 700, color: 'var(--accent-cobalt)' }}>
                      {c.streamRequired}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Entrance Exam */}
                <tr style={{ borderBottom: '1px solid #E5E2D6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    Primary Entrance Exam
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)' }}>
                      <span className="sticker sticker-coral" style={{ fontSize: '0.74rem' }}>
                        {c.primaryExam}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row 3: Duration */}
                <tr style={{ borderBottom: '1px solid #E5E2D6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    Undergrad Duration
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)', fontWeight: 600 }}>
                      {c.duration}
                    </td>
                  ))}
                </tr>

                {/* Row 4: Starter Salary */}
                <tr style={{ borderBottom: '1px solid #E5E2D6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    Starter Entry Salary
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)' }}>
                      <div className="sticker sticker-lime" style={{ fontSize: '0.8rem', fontWeight: 900 }}>
                        {c.salaryEntry}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row 5: Mid-Career Salary */}
                <tr style={{ borderBottom: '1px solid #E5E2D6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    5-Year Progression
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)', fontWeight: 800, color: 'var(--ink-primary)' }}>
                      {c.salaryMid}
                    </td>
                  ))}
                </tr>

                {/* Row 6: Work Environment */}
                <tr style={{ borderBottom: '1px solid #E5E2D6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    Daily Work Setting
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)', color: 'var(--ink-secondary)', fontSize: '0.86rem' }}>
                      {c.workEnvironment}
                    </td>
                  ))}
                </tr>

                {/* Row 7: Reality Check */}
                <tr>
                  <td style={{ padding: '14px 16px', fontWeight: 800, borderRight: 'var(--border-width) solid var(--border-ink)', background: 'var(--bg-surface-alt)', color: 'var(--ink-primary)' }}>
                    Reality Check / Caveat
                  </td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px 16px', borderRight: 'var(--border-width) solid var(--border-ink)' }}>
                      <div
                        style={{
                          background: '#FFF9E6',
                          border: '1.5px solid #F59E0B',
                          padding: '10px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          color: '#92400E',
                          lineHeight: '1.4',
                          display: 'flex',
                          gap: '6px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" style={{ marginTop: '2px' }} />
                        <span>{c.uncertainty}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Footer controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
            ✦ Tip: Select any career in the catalog to inspect semester-by-semester roadmaps.
          </div>

          <button id="btn-done-comparison" className="btn-brutal btn-lime" onClick={onClose}>
            Close Comparison <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
