import React, { useState, useEffect } from 'react';
import { api, Career } from '../../lib/api';
import { X, Bookmark, Trash2, ArrowRight, RefreshCw, Compass } from 'lucide-react';

interface SavedDrawerProps {
  sessionId: string;
  onClose: () => void;
  onSelectCareer: (career: Career) => void;
  onRemoveCareer: (careerId: string) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  sessionId,
  onClose,
  onSelectCareer,
  onRemoveCareer,
}) => {
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSaved() {
      try {
        const data = await api.getSavedCareers(sessionId);
        setSavedItems(data);
      } catch (err) {
        console.error('Failed to load saved careers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, [sessionId]);

  const handleRemove = async (careerId: string) => {
    try {
      await api.removeSavedCareer(sessionId, careerId);
      setSavedItems(prev => prev.filter(item => item.careerId !== careerId));
      onRemoveCareer(careerId);
    } catch (err) {
      console.error('Failed to remove career:', err);
    }
  };

  return (
    <div className="drawer-right animate-fade-in" role="dialog" aria-modal="true">
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: 'var(--border-thick) solid var(--border-ink)',
          background: 'var(--accent-yellow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 0 var(--border-ink)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              background: '#FFFFFF',
              border: 'var(--border-width) solid var(--border-ink)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px var(--border-ink)',
            }}
          >
            <Bookmark className="w-5 h-5 text-ink-primary" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--ink-primary)', fontFamily: 'var(--font-display)' }}>
              Saved Shortlist
            </div>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-secondary)', fontWeight: 700 }}>
              {savedItems.length} BOOKMARKED PATHWAYS
            </div>
          </div>
        </div>

        <button
          id="btn-close-saved-drawer"
          onClick={onClose}
          className="btn-brutal btn-white btn-brutal-sm"
          style={{ padding: '6px 10px' }}
        >
          <X className="w-5 h-5 text-ink-primary" />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {loading ? (
          <div className="brutal-card-static" style={{ textAlign: 'center', padding: '40px', background: '#FFFFFF' }}>
            <RefreshCw className="w-7 h-7 animate-spin text-cobalt" style={{ margin: '0 auto 10px auto' }} />
            <div style={{ fontWeight: 800 }}>Loading saved shortlist...</div>
          </div>
        ) : savedItems.length === 0 ? (
          <div className="brutal-card-static" style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'var(--accent-lime)',
                border: 'var(--border-width) solid var(--border-ink)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Bookmark className="w-7 h-7 text-ink-primary" />
            </div>
            <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--ink-primary)', marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
              No Saved Careers Yet
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', maxWidth: '280px', margin: '0 auto' }}>
              Click the bookmark icon on any career card in the catalog or results to curate your personal exploration shortlist.
            </p>
          </div>
        ) : (
          savedItems.map(item => {
            const career = item.career;
            if (!career) return null;

            return (
              <div
                key={item.careerId}
                className="brutal-card"
                style={{ padding: '20px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="sticker sticker-cyan" style={{ fontSize: '0.72rem' }}>
                    {career.clusterName}
                  </span>
                  <button
                    onClick={() => handleRemove(item.careerId)}
                    title="Remove from saved list"
                    className="btn-brutal btn-white btn-brutal-sm"
                    style={{ padding: '4px 8px', borderColor: '#E5E7EB' }}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>

                <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--ink-primary)', fontFamily: 'var(--font-display)' }}>
                  {career.name}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
                  <span className="stamp">
                    ENTRY: {career.salaryRange.entry}
                  </span>
                  <span className="stamp">
                    STREAM: {career.pathways[0]?.streamRequired.split(' ')[0]}
                  </span>
                </div>

                {item.notes && (
                  <div
                    style={{
                      fontSize: '0.82rem',
                      background: 'var(--bg-surface-alt)',
                      border: '1.5px dashed var(--border-ink)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      color: 'var(--ink-primary)',
                      fontStyle: 'italic',
                    }}
                  >
                    "{item.notes}"
                  </div>
                )}

                <button
                  className="btn-brutal btn-lime btn-brutal-sm"
                  style={{ marginTop: '8px', width: '100%' }}
                  onClick={() => {
                    onSelectCareer(career);
                    onClose();
                  }}
                >
                  Inspect Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: 'var(--border-width) solid var(--border-ink)',
          background: 'var(--bg-surface-alt)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.76rem',
          color: 'var(--ink-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Compass className="w-4 h-4 text-cobalt" />
        Saved locally in session — zero account required.
      </div>
    </div>
  );
};
