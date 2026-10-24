import React, { useState, useEffect } from 'react';
import { api, TryActivity } from '../../lib/api';
import { Cpu, Clock, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface SimulationsCatalogProps {
  onLaunchSimulation: (activityId: string) => void;
}

export const SimulationsCatalog: React.FC<SimulationsCatalogProps> = ({ onLaunchSimulation }) => {
  const [activities, setActivities] = useState<TryActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await api.getActivities();
        setActivities(data);
      } catch (err) {
        console.error('Failed to load activities:', err);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 0 80px 0' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span className="badge badge-strong">Signature Feature</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Experience-Informed Career Exploration</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Try Before You Choose: Micro-Simulations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px', maxWidth: '750px' }}>
          Don't just read career job descriptions. In 5–8 minutes, test-drive real challenges faced by UX designers, data scientists, researchers, lawyers, and financial analysts!
        </p>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <RefreshCw className="w-8 h-8 animate-spin text-teal-400" style={{ margin: '0 auto 16px auto' }} />
          Loading simulation lab...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {activities.map(act => (
            <div
              key={act.id}
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-cluster">{act.area}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock className="w-3.5 h-3.5" /> {act.durationMinutes} mins
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                  {act.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '16px' }}>
                  {act.scenario}
                </p>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--accent-teal)', marginBottom: '18px' }}>
                  <strong>Task:</strong> {act.instructions}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <button
                  id={`btn-launch-${act.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => onLaunchSimulation(act.id)}
                >
                  <Cpu className="w-4 h-4" /> Start Micro-Challenge <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
