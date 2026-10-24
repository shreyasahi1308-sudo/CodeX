import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, HelpCircle, RefreshCw, Zap } from 'lucide-react';
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
        <RefreshCw className="w-8 h-8 text-black animate-spin" style={{ margin: '0 auto 16px auto' }} />
        <p style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-mono)' }}>LOADING QUESTIONNAIRE BANK...</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '30px 0 80px 0', maxWidth: '860px' }}>
      {/* Top Header Card */}
      <div
        className="brutal-card"
        style={{
          padding: '24px 28px',
          marginBottom: '28px',
          background: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
            <span className="sticker sticker-lime">STAGE 0{step} OF 04</span>
            <span className="stamp">HOLLAND RIASEC ENGINE</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase' }}>
            {step === 1 && '18 Hands-On Activity Tasks'}
            {step === 2 && 'School Subject Affinities'}
            {step === 3 && 'Skills You Love Building'}
            {step === 4 && 'Work Setting & Discovery Openness'}
          </h2>
        </div>

        <button
          id="btn-prefill-demo"
          className="btn-brutal btn-yellow btn-brutal-sm"
          onClick={prefillAsha}
          title="Fills realistic answers for persona Asha from Master Blueprint"
        >
          <Zap className="w-4 h-4 fill-black" />
          Load Demo Student (Asha)
        </button>
      </div>

      {/* Progress Bar & Status */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '8px' }}>
          <span>[PROGRESS TRACKER]</span>
          <span>{progressPercent}% COMPLETED</span>
        </div>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* STEP 1: 18 Activity Statements */}
      {step === 1 && (
        <div>
          <div
            className="brutal-card card-yellow"
            style={{
              padding: '16px 20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.92rem',
              fontWeight: 600,
            }}
          >
            <HelpCircle className="w-5 h-5 text-black shrink-0" />
            <span>
              <strong>PROMPT:</strong> Imagine you had time, help, and zero exam stress. How much would you genuinely enjoy doing each task? Rate from <strong>1 (Not at all)</strong> to <strong>5 (Loved it!)</strong>.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {questions.map((q, idx) => {
              const currentRating = ratings[q.id] || 0;
              return (
                <div
                  key={q.id}
                  className="brutal-card"
                  style={{
                    padding: '20px',
                    background: currentRating > 0 ? '#FFFFFF' : '#FAF9F5',
                    borderLeft: currentRating > 0 ? '6px solid var(--border-ink)' : 'var(--border-width) solid var(--border-ink)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, flex: 1 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cobalt)', marginRight: '10px', fontWeight: 800 }}>
                        [{String(idx + 1).padStart(2, '0')}]
                      </span>
                      {q.prompt}
                    </div>
                    {currentRating > 0 && (
                      <span className="sticker sticker-lime" style={{ fontSize: '0.72rem' }}>
                        RATED: {currentRating}/5
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
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
                          className={`btn-brutal ${isSelected ? 'btn-lime' : 'btn-white'}`}
                          style={{
                            padding: '10px 4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span style={{ fontSize: '1.15rem', fontWeight: 900 }}>{opt.val}</span>
                          <span style={{ fontSize: '0.74rem', textAlign: 'center', lineHeight: 1.1 }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn-brutal btn-white" onClick={onCancel}>
              ← Exit to Home
            </button>
            <button
              id="wizard-step1-next"
              className="btn-brutal btn-lime btn-brutal-lg"
              disabled={answeredActivitiesCount < 6}
              onClick={() => setStep(2)}
            >
              Continue to Subjects ({answeredActivitiesCount}/18 Rated)
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Academic Subjects */}
      {step === 2 && (
        <div>
          <div className="brutal-card card-cobalt" style={{ padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
              CHOOSE UP TO 3 HIGH SCHOOL SUBJECTS YOU ENJOY OR WANT TO STUDY IN CLASS 11–12:
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '32px' }}>
            {subjectsList.map(subj => {
              const isSelected = selectedSubjects.includes(subj.id);
              return (
                <div
                  key={subj.id}
                  id={`subject-${subj.id}`}
                  onClick={() => toggleSubject(subj.id)}
                  className={`brutal-card ${isSelected ? 'card-lime' : ''}`}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>{subj.label}</span>
                    {isSelected && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="stamp" style={{ alignSelf: 'flex-start' }}>{subj.stream}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-brutal btn-white" onClick={() => setStep(1)}>
              <ArrowLeft className="w-4 h-4" /> Back to Activities
            </button>
            <button
              id="wizard-step2-next"
              className="btn-brutal btn-lime btn-brutal-lg"
              onClick={() => setStep(3)}
            >
              Continue to Skills ({selectedSubjects.length}/3 Picked)
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Skills to Build */}
      {step === 3 && (
        <div>
          <div className="brutal-card card-cyan" style={{ padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
              PICK UP TO 3 CAPABILITIES YOU WOULD LOVE TO MASTER DURING SCHOOL & COLLEGE:
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '32px' }}>
            {skillsList.map(sk => {
              const isSelected = selectedSkills.includes(sk.id);
              return (
                <div
                  key={sk.id}
                  id={`skill-${sk.id}`}
                  onClick={() => toggleSkill(sk.id)}
                  className={`brutal-card ${isSelected ? 'card-yellow' : ''}`}
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>{sk.label}</span>
                  {isSelected && (
                    <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-brutal btn-white" onClick={() => setStep(2)}>
              <ArrowLeft className="w-4 h-4" /> Back to Subjects
            </button>
            <button
              id="wizard-step3-next"
              className="btn-brutal btn-lime btn-brutal-lg"
              onClick={() => setStep(4)}
            >
              Continue: Work Setting & Openness
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Environments & Openness */}
      {step === 4 && (
        <div>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
              Preferred Work Environment (Pick up to 2)
            </h3>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Where do you picture yourself doing your best thinking and collaborating?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {envsList.map(env => {
                const isSelected = selectedEnvs.includes(env.id);
                return (
                  <div
                    key={env.id}
                    id={`env-${env.id}`}
                    onClick={() => toggleEnv(env.id)}
                    className={`brutal-card ${isSelected ? 'card-lime' : ''}`}
                    style={{
                      padding: '14px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    <span>{env.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-black stroke-[3]" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="brutal-card" style={{ padding: '24px', background: '#FFFFFF', marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label htmlFor="openness-range" style={{ fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase' }}>
                How open are you to careers you haven't heard of before?
              </label>
              <span className="sticker sticker-coral">LEVEL {openness} OF 5</span>
            </div>
            <input
              id="openness-range"
              type="range"
              min={1}
              max={5}
              value={openness}
              onChange={e => setOpenness(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: 'var(--ink-primary)', height: '10px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginTop: '8px' }}>
              <span>Show familiar careers only (1)</span>
              <span>Balanced mix (3)</span>
              <span>Show adventurous stretch options! (5)</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-brutal btn-white" onClick={() => setStep(3)}>
              <ArrowLeft className="w-4 h-4" /> Back to Skills
            </button>
            <button
              id="btn-submit-assessment"
              className="btn-brutal btn-lime btn-brutal-lg"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Calculating Explainable Match...
                </>
              ) : (
                <>
                  <Compass className="w-5 h-5" />
                  Reveal My Personalized Recommendations →
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
