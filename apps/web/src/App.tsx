import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './features/landing/Hero';
import { QuestionnaireWizard } from './features/assessment/QuestionnaireWizard';
import { ResultsDashboard } from './features/assessment/ResultsDashboard';
import { CareerCatalog } from './features/careers/CareerCatalog';
import { SimulationsCatalog } from './features/simulation/SimulationsCatalog';
import { CareerDetailModal } from './features/careers/CareerDetailModal';
import { ActivityRunnerModal } from './features/simulation/ActivityRunnerModal';
import { MentorDrawer } from './features/gemma/MentorDrawer';
import { ComparisonModal } from './features/comparison/ComparisonModal';
import { SavedDrawer } from './features/saved/SavedDrawer';
import { api, Career, RecommendationResponse } from './lib/api';

export function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'questionnaire' | 'results' | 'catalog' | 'activities'>('landing');

  // Assessment State
  const [results, setResults] = useState<RecommendationResponse | null>(null);
  const [userAnswers, setUserAnswers] = useState<any | null>(null);

  // Modals & Drawers
  const [selectedCareer, setSelectedCareer] = useState<{ career: Career; scorePercent?: number } | null>(null);
  const [mentorCareer, setMentorCareer] = useState<Career | null>(null);
  const [activeSimulationId, setActiveSimulationId] = useState<string | null>(null);
  const [compareCareerIds, setCompareCareerIds] = useState<string[] | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);

  // Session & Bookmarks Persistence
  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem('pathlab_session_id') || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  });
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>([]);
  const [aiStatus, setAiStatus] = useState<{ configured: boolean; model: string }>({
    configured: true,
    model: 'google/gemma-4-31B-it:novita',
  });

  useEffect(() => {
    localStorage.setItem('pathlab_session_id', sessionId);

    // Initial health check
    api.getHealth()
      .then(res => {
        if (res.aiProvider) {
          setAiStatus({
            configured: res.aiProvider.tokenConfigured,
            model: res.aiProvider.model,
          });
        }
      })
      .catch(err => console.warn('Health check warning:', err));

    // Load saved bookmarks for session
    api.getSavedCareers(sessionId)
      .then(items => {
        setSavedCareerIds(items.map((i: any) => i.careerId));
      })
      .catch(err => console.warn('Failed to load saved careers:', err));
  }, [sessionId]);

  const handleAssessmentComplete = (data: RecommendationResponse, answers: any) => {
    setResults(data);
    setUserAnswers(answers);
    if (data.sessionId) {
      setSessionId(data.sessionId);
      localStorage.setItem('pathlab_session_id', data.sessionId);
    }
    setActiveTab('results');
  };

  const handleToggleSave = async (careerId: string) => {
    if (savedCareerIds.includes(careerId)) {
      await api.removeSavedCareer(sessionId, careerId);
      setSavedCareerIds(prev => prev.filter(id => id !== careerId));
    } else {
      await api.saveCareer(sessionId, careerId);
      setSavedCareerIds(prev => [...prev, careerId]);
    }
  };

  const isCareerSaved = (careerId: string) => savedCareerIds.includes(careerId);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResults={Boolean(results)}
        savedCount={savedCareerIds.length}
        openSavedDrawer={() => setIsSavedDrawerOpen(true)}
        openCompareModal={() => {
          if (results && results.mainRecommendations.length >= 2) {
            setCompareCareerIds([
              results.mainRecommendations[0].career.id,
              results.mainRecommendations[1].career.id,
            ]);
          } else {
            setCompareCareerIds(['ux-designer', 'data-scientist', 'software-engineer']);
          }
        }}
        aiStatus={aiStatus}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && (
          <Hero
            onStartQuiz={() => setActiveTab('questionnaire')}
            onBrowseCareers={() => setActiveTab('catalog')}
            onExploreSimulations={() => setActiveTab('activities')}
          />
        )}

        {activeTab === 'questionnaire' && (
          <QuestionnaireWizard
            onComplete={handleAssessmentComplete}
            onCancel={() => setActiveTab('landing')}
          />
        )}

        {activeTab === 'results' && results && (
          <ResultsDashboard
            results={results}
            onSelectCareer={(career, scorePercent) => setSelectedCareer({ career, scorePercent })}
            onLaunchSimulation={id => setActiveSimulationId(id)}
            onSaveCareer={handleToggleSave}
            isCareerSaved={isCareerSaved}
            onRetake={() => setActiveTab('questionnaire')}
            onCompare={ids => setCompareCareerIds(ids)}
          />
        )}

        {activeTab === 'catalog' && (
          <CareerCatalog
            onSelectCareer={career => setSelectedCareer({ career, scorePercent: 70 })}
            onLaunchSimulation={id => setActiveSimulationId(id)}
            onSaveCareer={handleToggleSave}
            isCareerSaved={isCareerSaved}
          />
        )}

        {activeTab === 'activities' && (
          <SimulationsCatalog
            onLaunchSimulation={id => setActiveSimulationId(id)}
          />
        )}
      </main>

      {/* Deep-Dive Career Detail Modal */}
      {selectedCareer && (
        <CareerDetailModal
          career={selectedCareer.career}
          scorePercent={selectedCareer.scorePercent}
          userAnswers={userAnswers}
          onClose={() => setSelectedCareer(null)}
          onOpenMentor={career => setMentorCareer(career)}
          onLaunchSimulation={id => setActiveSimulationId(id)}
          isSaved={isCareerSaved(selectedCareer.career.id)}
          onToggleSave={() => handleToggleSave(selectedCareer.career.id)}
        />
      )}

      {/* "Ask Gemma" Career Mentor Drawer */}
      {mentorCareer && (
        <MentorDrawer
          career={mentorCareer}
          onClose={() => setMentorCareer(null)}
        />
      )}

      {/* "Try Before You Choose" Activity Runner Modal */}
      {activeSimulationId && (
        <ActivityRunnerModal
          activityId={activeSimulationId}
          sessionId={sessionId}
          onClose={() => setActiveSimulationId(null)}
          onReflectionApplied={dimShift => {
            console.log('Applied dimension shift from activity:', dimShift);
          }}
        />
      )}

      {/* Side-by-Side Comparison Modal */}
      {compareCareerIds && (
        <ComparisonModal
          careerIds={compareCareerIds}
          onClose={() => setCompareCareerIds(null)}
          onSelectCareer={id => {
            setCompareCareerIds(null);
            api.getCareerById(id).then(c => setSelectedCareer({ career: c, scorePercent: 75 }));
          }}
        />
      )}

      {/* Saved Careers Shortlist Drawer */}
      {isSavedDrawerOpen && (
        <SavedDrawer
          sessionId={sessionId}
          onClose={() => setIsSavedDrawerOpen(false)}
          onSelectCareer={c => setSelectedCareer({ career: c, scorePercent: 75 })}
          onRemoveCareer={id => setSavedCareerIds(prev => prev.filter(cId => cId !== id))}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
