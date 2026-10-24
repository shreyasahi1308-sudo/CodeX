import React from 'react';
import { Compass, Sparkles, BookOpen, Layers, Bookmark, Cpu } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'questionnaire' | 'results' | 'catalog' | 'activities';
  setActiveTab: (tab: 'landing' | 'questionnaire' | 'results' | 'catalog' | 'activities') => void;
  hasResults: boolean;
  savedCount: number;
  openSavedDrawer: () => void;
  openCompareModal: () => void;
  aiStatus: { configured: boolean; model: string };
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasResults,
  savedCount,
  openSavedDrawer,
  openCompareModal,
  aiStatus,
}) => {
  return (
    <header className="navbar" role="banner">
      <div className="container nav-container">
        <div
          className="nav-brand"
          onClick={() => setActiveTab('landing')}
          role="button"
          tabIndex={0}
          id="nav-brand-home"
        >
          <div className="nav-logo-box">
            <Compass className="w-6 h-6 text-ink-primary" />
          </div>
          <div>
            <div className="nav-brand-title">PathLab India</div>
            <div className="nav-brand-subtitle">Classes 9–12 Career Discovery</div>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main Navigation">
          <button
            id="nav-tab-discover"
            className={`nav-item ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing')}
          >
            <Compass className="w-4 h-4" />
            Home
          </button>

          <button
            id="nav-tab-quiz"
            className={`nav-item ${activeTab === 'questionnaire' ? 'active' : ''}`}
            onClick={() => setActiveTab('questionnaire')}
          >
            <Sparkles className="w-4 h-4" />
            Discovery Quiz
          </button>

          {hasResults && (
            <button
              id="nav-tab-results"
              className={`nav-item ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              <Layers className="w-4 h-4 text-cobalt" />
              My Matches
            </button>
          )}

          <button
            id="nav-tab-catalog"
            className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <BookOpen className="w-4 h-4" />
            Career Catalog
          </button>

          <button
            id="nav-tab-activities"
            className={`nav-item ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            <Cpu className="w-4 h-4" />
            Simulations
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            id="btn-nav-compare"
            className="btn-brutal btn-white btn-brutal-sm"
            onClick={openCompareModal}
            title="Compare multiple careers side-by-side"
          >
            <Layers className="w-4 h-4 text-cobalt" />
            Compare
          </button>

          <button
            id="btn-nav-saved"
            className="btn-brutal btn-yellow btn-brutal-sm"
            onClick={openSavedDrawer}
            title="View your saved careers"
            style={{ position: 'relative' }}
          >
            <Bookmark className="w-4 h-4 text-ink-primary" />
            Saved
            {savedCount > 0 && (
              <span
                className="sticker sticker-coral"
                style={{
                  fontSize: '0.68rem',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  marginLeft: '4px',
                  boxShadow: 'none',
                }}
              >
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

