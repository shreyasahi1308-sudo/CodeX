import React, { useState, useEffect } from 'react';
import { api, Career } from '../../lib/api';
import { X, Bookmark, Trash2, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';

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
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bookmark className="w-5 h-5 text-teal-400" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>Saved Career Shortlist</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{savedItems.length} bookmarked paths</div>
          </div>
        </div>

        <button
          id="btn-close-saved-drawer"
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-faint)' }}>
            <RefreshCw className="w-6 h-6 animate-spin text-teal-400" style={{ margin: '0 auto 8px auto' }} />
            Loading saved shortlist...
          </div>
        ) : savedItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-faint)' }}>
            <Bookmark className="w-10 h-10 text-slate-600" style={{ margin: '0 auto 12px auto' }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              No saved careers yet
            </div>
            <p style={{ fontSize: '0.82rem' }}>
              Click the bookmark icon on any career card to save it to your exploration shortlist.
            </p>
          </div>
        ) : (
          savedItems.map(item => {
            const career = item.career;
            if (!career) return null;

            return (
              <div
                key={item.careerId}
                className="glass-panel"
                style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="badge badge-cluster" style={{ fontSize: '0.7rem' }}>
                    {career.clusterName}
                  </span>
                  <button
                    onClick={() => handleRemove(item.careerId)}
                    title="Remove from saved list"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 className="w-4 h-4 hover:text-rose-400" />
                  </button>
                </div>

                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                  {career.name}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {career.salaryRange.entry} · Stream: {career.pathways[0]?.streamRequired.split(' ')[0]}
                </div>

                {item.notes && (
                  <div style={{ fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.04)', padding: '6px 8px', borderRadius: '4px', color: 'var(--accent-teal)' }}>
                    "{item.notes}"
                  </div>
                )}

                <button
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '6px' }}
                  onClick={() => {
                    onSelectCareer(career);
                    onClose();
                  }}
                >
                  View Educational Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
