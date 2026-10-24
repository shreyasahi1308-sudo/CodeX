import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, HelpCircle, RefreshCw } from 'lucide-react';
import { api, RecommendationResponse } from '../../lib/api';

interface QuestionnaireWizardProps {
  onComplete: (data: RecommendationResponse, answers: any) => void;
  onCancel: () => void;
}

export const QuestionnaireWizard: React.FC<QuestionnaireWizardProps> = ({ onComplete, onCancel }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // 1: Activities, 2: Subjects, 3: Skills, 4: Environments & Openness

  // Question banks loaded from backend
  const [questions, setQuestions] = useState<any[]>([]);
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [envsList, setEnvsList] = useState<any[]>([]);

  // Current answers
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
  const [openness, setOpenness] = useState<number>(3);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getQuestions();
        setQuestions(data.questions);
        setSubjectsList(data.subjects);
        setSkillsList(data.growthSkills);
        setEnvsList(data.environments);
      } catch (err) {
        console.error('Failed to load questionnaire data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleRatingChange = (id: string, val: number) => {
    setRatings(prev => ({ ...prev, [id]: val }));
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleEnv = (id: string) => {
    setSelectedEnvs(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  // Pre-fills blueprint sample persona: "Asha" (High Investigative & Artistic)
  const prefillAsha = () => {
    setRatings({
      r1: 2, r2: 2, r3: 2,
      i1: 5, i2: 5, i3: 4,
      a1: 5, a2: 3, a3: 3,
      s1: 4, s2: 3, s3: 3,
      e1: 2, e2: 2, e3: 2,
      c1: 2, c2: 3, c3: 2,
    });
    setSelectedSubjects(['biology', 'computer-science', 'art-design']);
    setSelectedSkills(['coding', 'lab-skills', 'communication']);
    setSelectedEnvs(['studio', 'office']);
    setOpenness(4);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const answersPayload = {
      activityRatings: ratings,
      subjects: selectedSubjects,
      growthSkills: selectedSkills,
      environments: selectedEnvs,
      openness,
    };

    try {
      const response = await api.submitAssessment(answersPayload);
      onComplete(response, answersPayload);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to calculate recommendations. Please check backend connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const answeredActivitiesCount = Object.keys(ratings).length;
  const progressPercent =
    step === 1
      ? Math.round((answeredActivitiesCount / 18) * 60)
      : step === 2
      ? 75
      : step === 3
      ? 88
      : 100;

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" style={{ margin: '0 auto 16px auto' }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading questionnaire bank...</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 0 80px 0', maxWidth: '800px' }}>
      {/* Top Header & Fast Pre-fill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span className="badge badge-cluster">Step {step} of 4</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '6px' }}>
            {step === 1 && 'What kind of activities energize you?'}
            {step === 2 && 'Which subjects do you enjoy most?'}
            {step === 3 && 'Which skills would you love to build?'}
            {step === 4 && 'Work environment & openness'}
          </h2>
        </div>

        <button
          id="btn-prefill-demo"
          className="btn btn-secondary btn-sm"
          onClick={prefillAsha}
          title="Fills realistic answers for persona Asha from Master Blueprint"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Load Demo Student (Asha)
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>Exploration Progress</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* STEP 1: 18 Activity Statements */}
      {step === 1 && (
        <div>
          <div
            style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
            }}
          >
            <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>
              <strong>Prompt:</strong> Imagine you had time, resources, and help. How much would you enjoy doing each task? Rate from 1 (Not at all) to 5 (Loved it!).
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {questions.map((q, idx) => {
              const currentRating = ratings[q.id] || 0;
              return (
                <div
                  key={q.id}
                  className="glass-panel"
                  style={{
                    padding: '18px 20px',
                    borderColor: currentRating > 0 ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.96rem', fontWeight: 600, marginBottom: '14px', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--primary-400)', marginRight: '8px' }}>{idx + 1}.</span>
                    {q.prompt}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                    {[
                      { val: 1, label: 'Not at all' },
                      { val: 2, label: 'A little' },
                      { val: 3, label: 'Okay' },
                      { val: 4, label: 'Quite a lot' },
                      { val: 5, label: 'Loved it!' },
                    ].map(opt => {
                      const isSelected = currentRating === opt.val;
                      return (
                        <button
                          key={opt.val}
                          type="button"
                          id={`rating-${q.id}-${opt.val}`}
                          onClick={() => handleRatingChange(q.id, opt.val)}
                          style={{
                            padding: '10px 4px',
                            borderRadius: '8px',
                            background: isSelected ? 'var(--primary-600)' : 'rgba(255, 255, 255, 0.05)',
                            color: isSelected ? '#ffffff' : 'var(--text-muted)',
                            border: isSelected ? '1px solid var(--primary-400)' : '1px solid transparent',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s',
                          }}
                        >
                          <span style={{ fontSize: '1rem', fontWeight: 800 }}>{opt.val}</span>
                          <span style={{ textAlign: 'center', lineHeight: 1.2 }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button
              id="wizard-step1-next"
              className="btn btn-primary"
              disabled={answeredActivitiesCount < 6}
              onClick={() => setStep(2)}
            >
              Next: Favorite Subjects ({answeredActivitiesCount}/18 Rated)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Academic Subjects */}
      {step === 2 && (
        <div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
            Select up to <strong>3 subjects</strong> you find genuinely engaging or would like to study in Classes 11–12:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {subjectsList.map(subj => {
              const isSelected = selectedSubjects.includes(subj.id);
              return (
                <div
                  key={subj.id}
                  id={`subject-${subj.id}`}
                  onClick={() => toggleSubject(subj.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                      {subj.label}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>{subj.stream}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" /> Back to Activities
            </button>
            <button
              id="wizard-step2-next"
              className="btn btn-primary"
              onClick={() => setStep(3)}
            >
              Next: Skills to Grow ({selectedSubjects.length}/3)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Skills to Build */}
      {step === 3 && (
        <div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
            Choose up to <strong>3 capabilities</strong> you would love to master during school and college:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {skillsList.map(sk => {
              const isSelected = selectedSkills.includes(sk.id);
              return (
                <div
                  key={sk.id}
                  id={`skill-${sk.id}`}
                  onClick={() => toggleSkill(sk.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(20, 184, 166, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                    {sk.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" /> Back to Subjects
            </button>
            <button
              id="wizard-step3-next"
              className="btn btn-primary"
              onClick={() => setStep(4)}
            >
              Next: Work Settings & Openness
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Environments & Openness */}
      {step === 4 && (
        <div>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>
              Preferred Work Environment (Optional, pick up to 2)
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
              Where do you picture yourself doing your best thinking?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {envsList.map(env => {
                const isSelected = selectedEnvs.includes(env.id);
                return (
                  <div
                    key={env.id}
                    id={`env-${env.id}`}
                    onClick={() => toggleEnv(env.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>{env.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label htmlFor="openness-range" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                How open are you to careers you haven't heard of before?
              </label>
              <span style={{ color: 'var(--accent-teal)', fontWeight: 800 }}>Level {openness} of 5</span>
            </div>
            <input
              id="openness-range"
              type="range"
              min={1}
              max={5}
              value={openness}
              onChange={e => setOpenness(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: 'var(--primary-500)', height: '6px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-faint)', marginTop: '6px' }}>
              <span>Show familiar careers only (1)</span>
              <span>Balanced mix (3)</span>
              <span>Show adventurous stretch options! (5)</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={() => setStep(3)}>
              <ArrowLeft className="w-4 h-4" /> Back to Skills
            </button>
            <button
              id="btn-submit-assessment"
              className="btn btn-primary btn-lg"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Calculating Transparent Match...
                </>
              ) : (
                <>
                  <Compass className="w-5 h-5" />
                  Reveal My Personalized Recommendations
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
