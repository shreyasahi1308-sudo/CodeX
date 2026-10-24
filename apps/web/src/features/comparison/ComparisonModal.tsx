import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { X, Layers, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

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
      <div className="modal-content animate-fade-in" style={{ padding: '36px', maxWidth: '960px' }}>
        <button
          id="btn-close-compare-modal"
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Layers className="w-6 h-6 text-indigo-400" />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Side-by-Side Career Comparison</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
          Compare entrance exam competition, stream requirements, study duration, and starter salary benchmarks across your shortlisted options.
        </p>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" style={{ margin: '0 auto 12px auto' }} />
            Building comparison matrix...
          </div>
        ) : data && data.careers ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th style={{ padding: '14px', width: '22%', color: 'var(--text-faint)' }}>Feature</th>
                  {data.careers.map((c: any) => (
                    <th key={c.id} style={{ padding: '14px', width: `${78 / data.careers.length}%`, color: '#ffffff', fontWeight: 800, fontSize: '1.05rem' }}>
                      {c.name}
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>
                        {c.clusterName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Class 11–12 Stream</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px', color: '#38bdf8', fontWeight: 600 }}>
                      {c.streamRequired}
                    </td>
                  ))}
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Primary Entrance Exam</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px' }}>
                      <span className="badge badge-cluster">{c.primaryExam}</span>
                    </td>
                  ))}
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Undergrad Duration</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px', color: 'var(--text-main)' }}>
                      {c.duration}
                    </td>
                  ))}
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Starter Salary (INR)</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px', color: '#4ade80', fontWeight: 700 }}>
                      {c.salaryEntry}
                    </td>
                  ))}
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Mid-Career Salary (INR)</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px', color: '#38bdf8', fontWeight: 700 }}>
                      {c.salaryMid}
                    </td>
                  ))}
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Work Environment</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px', color: 'var(--text-muted)' }}>
                      {c.workEnvironment}
                    </td>
                  ))}
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--text-muted)' }}>Key Reality Check</td>
                  {data.careers.map((c: any) => (
                    <td key={c.id} style={{ padding: '14px', color: '#fef08a', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      ⚠️ {c.uncertainty}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
          <button id="btn-done-comparison" className="btn btn-primary" onClick={onClose}>
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
