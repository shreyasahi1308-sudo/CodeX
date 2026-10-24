import React, { useState, useEffect } from 'react';
import { api, TryActivity } from '../../lib/api';
import { Cpu, Clock, ArrowRight, Sparkles, RefreshCw, Zap } from 'lucide-react';

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
    <div className="container animate-fade-in" style={{ padding: '30px 0 80px 0' }}>
      <div
        className="brutal-card card-lime"
        style={{
          padding: '28px 32px',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span className="sticker sticker-coral">EXPERIENCE-FIRST EXPLORATION</span>
          <span className="stamp">5–8 MINUTE MICRO-TASKS</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>
          Try Before You Choose: Simulation Lab
        </h1>
        <p style={{ color: 'var(--ink-primary)', fontSize: '0.95rem', marginTop: '4px', maxWidth: '780px', fontWeight: 600 }}>
          Don't just read about careers. Step into the shoes of a UX designer, data scientist, medical researcher, lawyer, or financial analyst to discover what you actually enjoy doing!
        </p>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--ink-secondary)', fontFamily: 'var(--font-mono)' }}>
          <RefreshCw className="w-8 h-8 animate-spin text-black" style={{ margin: '0 auto 16px auto' }} />
          LOADING SIMULATION LAB...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {activities.map(act => (
            <div
              key={act.id}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="sticker sticker-cyan">{act.area}</span>
                  <span className="stamp">
                    <Clock className="w-3.5 h-3.5 inline mr-1" /> {act.durationMinutes} MINS
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
                  {act.title}
                </h3>

                <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px', fontWeight: 500 }}>
                  {act.scenario}
                </p>

                <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-ink)', padding: '12px', borderRadius: '8px', fontSize: '0.84rem', color: 'var(--ink-primary)', fontWeight: 600, marginBottom: '20px' }}>
                  <strong style={{ color: 'var(--accent-cobalt)' }}>YOUR TASK:</strong> {act.instructions}
                </div>
              </div>

              <div style={{ borderTop: '2px solid var(--border-ink)', paddingTop: '16px' }}>
                <button
                  id={`btn-launch-${act.id}`}
                  className="btn-brutal btn-lime"
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
