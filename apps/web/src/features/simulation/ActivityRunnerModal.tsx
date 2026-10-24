import React, { useState, useEffect } from 'react';
import { TryActivity, api } from '../../lib/api';
import { X, Check, ArrowUp, ArrowDown, Sparkles, CheckCircle, AlertCircle, RefreshCw, Cpu, HelpCircle, ArrowRight } from 'lucide-react';

interface ActivityRunnerModalProps {
  activityId: string;
  sessionId: string;
  onClose: () => void;
  onReflectionApplied?: (dimShift: Record<string, number>) => void;
}

export const ActivityRunnerModal: React.FC<ActivityRunnerModalProps> = ({
  activityId,
  sessionId,
  onClose,
  onReflectionApplied,
}) => {
  const [activity, setActivity] = useState<TryActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stage, setStage] = useState<'task' | 'reflection' | 'feedback'>('task');

  // UX Screen Fixer State
  const [selectedFlaws, setSelectedFlaws] = useState<string[]>([]);
  const [screenElements, setScreenElements] = useState<any[]>([]);
  const [taskFeedback, setTaskFeedback] = useState<string | null>(null);

  // Canteen Sales Detective State
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null);

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [submittingReflection, setSubmittingReflection] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await api.getActivityById(activityId);
        setActivity(data);

        if (data.type === 'screen_fixer' && data.interactiveData?.screenMock?.elements) {
          setScreenElements([...data.interactiveData.screenMock.elements]);
        }
      } catch (err) {
        console.error('Failed to load activity:', err);
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, [activityId]);

  const toggleFlaw = (id: string) => {
    setSelectedFlaws(prev => (prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]));
  };

  const moveElement = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= screenElements.length) return;

    const copy = [...screenElements];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setScreenElements(copy);
  };

  const verifyTask = () => {
    if (activity?.type === 'screen_fixer') {
      const correctFlaws = ['flaw-1', 'flaw-2', 'flaw-4'];
      const correctCount = selectedFlaws.filter(f => correctFlaws.includes(f)).length;
      if (correctCount < 2) {
        setTaskFeedback('Almost! Notice where the important QR code and the tiny validity text are located.');
        return;
      }
      setTaskFeedback('Great eye! You identified the critical usability bottlenecks. Now let’s reflect on what you enjoyed.');
      setTimeout(() => setStage('reflection'), 1200);
    } else if (activity?.type === 'canteen_detective') {
      if (selectedHypothesis !== 'hyp-2') {
        setTaskFeedback('Look closely at the temperature column: compare sales on days above 36°C!');
        return;
      }
      setTaskFeedback('Spot on! You detected that weather temperature drives fruit bowl sales, disproving the manager’s assumption.');
      setTimeout(() => setStage('reflection'), 1200);
    } else {
      setStage('reflection');
    }
  };

  const handleReflectionSubmit = async () => {
    setSubmittingReflection(true);
    try {
      const result = await api.submitActivityReflection(activityId, {
        sessionId,
        userAction: {
          type: activity?.type,
          selectedFlaws,
          elementsOrder: screenElements.map(e => e.id),
          hypothesis: selectedHypothesis,
        },
        reflectionAnswers,
      });

      setEvaluationResult(result);
      if (onReflectionApplied && result.dimensionShift) {
        onReflectionApplied(result.dimensionShift);
      }
      setStage('feedback');
    } catch (err) {
      console.error('Reflection submission failed:', err);
    } finally {
      setSubmittingReflection(false);
    }
  };

  if (loading || !activity) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw className="w-8 h-8 text-black animate-spin" style={{ margin: '0 auto 16px auto' }} />
          <p style={{ fontFamily: 'var(--font-mono)' }}>LOADING MICRO-CHALLENGE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content animate-fade-in" style={{ padding: '36px', maxWidth: '840px' }}>
        <button
          id="btn-close-activity-modal"
          onClick={onClose}
          className="btn-brutal btn-white btn-brutal-sm"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '6px 8px',
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <span className="sticker sticker-lime">{activity.area}</span>
            <span className="stamp">5–8 MINUTE TRIAL</span>
          </div>

          <h2 style={{ fontSize: '1.9rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
            {activity.title}
          </h2>

          <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 500 }}>
            {activity.scenario}
          </p>
        </div>

        {/* STAGE 1: THE INTERACTIVE TASK */}
        {stage === 'task' && (
          <div>
            <div
              className="brutal-card card-yellow"
              style={{
                padding: '14px 18px',
                marginBottom: '24px',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              <strong>YOUR TASK:</strong> {activity.instructions}
            </div>

            {/* Task Type: Screen Fixer */}
            {activity.type === 'screen_fixer' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* Left: Usability Flaws Checklist */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px' }}>
                    1. Tap the Usability Flaws You Spot:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activity.interactiveData.screenMock.optionsFlaws.map((flaw: any) => {
                      const isChecked = selectedFlaws.includes(flaw.id);
                      return (
                        <div
                          key={flaw.id}
                          id={`flaw-${flaw.id}`}
                          onClick={() => toggleFlaw(flaw.id)}
                          className={`brutal-card ${isChecked ? 'card-lime' : ''}`}
                          style={{
                            padding: '12px 14px',
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '4px',
                              border: '2px solid var(--border-ink)',
                              background: isChecked ? '#121212' : '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>
                          <span>{flaw.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Rearrange Screen Elements */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px' }}>
                    2. Reorder for Rapid Bus Boarding:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {screenElements.map((el, index) => (
                      <div
                        key={el.id}
                        className="brutal-card"
                        style={{
                          padding: '12px 14px',
                          background: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                        }}
                      >
                        <span>{el.name}</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            className="btn-brutal btn-white btn-brutal-sm"
                            disabled={index === 0}
                            onClick={() => moveElement(index, 'up')}
                            style={{ padding: '4px 6px' }}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="btn-brutal btn-white btn-brutal-sm"
                            disabled={index === screenElements.length - 1}
                            onClick={() => moveElement(index, 'down')}
                            style={{ padding: '4px 6px' }}
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Task Type: Canteen Detective */}
            {activity.type === 'canteen_detective' && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', border: '2.5px solid var(--border-ink)' }}>
                    <thead>
                      <tr style={{ background: 'var(--accent-yellow)', borderBottom: '2.5px solid var(--border-ink)', textAlign: 'left' }}>
                        <th style={{ padding: '10px' }}>Day</th>
                        <th style={{ padding: '10px' }}>Temp (°C)</th>
                        <th style={{ padding: '10px' }}>Fruit Bowls</th>
                        <th style={{ padding: '10px' }}>Samosas Sold</th>
                      </tr>
                    </thead>
                    <tbody style={{ background: '#FFFFFF' }}>
                      {activity.interactiveData.records.map((r: any, i: number) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-ink)' }}>
                          <td style={{ padding: '10px', fontWeight: 700 }}>{r.day}</td>
                          <td style={{ padding: '10px', fontWeight: 800, color: r.tempC >= 36 ? '#b91c1c' : '#2563eb' }}>{r.tempC}°C</td>
                          <td style={{ padding: '10px', fontWeight: 700 }}>{r.fruitBowlsSold}</td>
                          <td style={{ padding: '10px', fontWeight: 700 }}>{r.samosasSold}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '12px' }}>
                  Which Conclusion is Supported by the Data?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activity.interactiveData.hypotheses.map((h: any) => (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHypothesis(h.id)}
                      className={`brutal-card ${selectedHypothesis === h.id ? 'card-lime' : ''}`}
                      style={{
                        padding: '14px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      {h.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {taskFeedback && (
              <div
                className="brutal-card"
                style={{
                  padding: '14px 18px',
                  background: taskFeedback.includes('Great') || taskFeedback.includes('Spot') ? 'var(--accent-lime)' : 'var(--accent-coral)',
                  color: taskFeedback.includes('Great') || taskFeedback.includes('Spot') ? 'var(--ink-primary)' : '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                }}
              >
                {taskFeedback}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button id="btn-submit-activity-task" className="btn-brutal btn-lime btn-brutal-lg" onClick={verifyTask}>
                Submit Activity Answer →
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: REFLECTION QUESTIONS */}
        {stage === 'reflection' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span className="sticker sticker-lime">TASK ACCOMPLISHED</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, textTransform: 'uppercase' }}>
                Reflect on How it Felt
              </h3>
            </div>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.92rem', marginBottom: '24px', fontWeight: 500 }}>
              We do not measure test aptitude. We ask: <em>did you enjoy this style of work?</em>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              {activity.reflectionQuestions.map((q, idx) => (
                <div key={q.id} className="brutal-card" style={{ padding: '20px', background: '#FFFFFF' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.96rem', marginBottom: '14px' }}>
                    0{idx + 1}. {q.prompt}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {q.options.map(opt => {
                      const isSelected = reflectionAnswers[q.id] === opt.value;
                      return (
                        <div
                          key={opt.value}
                          id={`ref-opt-${opt.value}`}
                          onClick={() => setReflectionAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                          className={`brutal-card ${isSelected ? 'card-lime' : ''}`}
                          style={{
                            padding: '12px 16px',
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                          }}
                        >
                          {opt.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                id="btn-submit-reflection"
                className="btn-brutal btn-lime btn-brutal-lg"
                disabled={submittingReflection || Object.keys(reflectionAnswers).length === 0}
                onClick={handleReflectionSubmit}
              >
                {submittingReflection ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Evaluating Experience...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Finish & View Career Coaching →
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: GEMMA COACHING FEEDBACK & PROFILE NUDGE */}
        {stage === 'feedback' && evaluationResult && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span className="sticker sticker-yellow">EXPERIENCE-INFORMED COACHING</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>
                Career Coaching & Profile Nudge
              </h3>
            </div>

            <div className="brutal-card card-lime" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px' }}>
                [COACH FEEDBACK]
              </div>
              <p style={{ fontSize: '0.98rem', fontWeight: 600, lineHeight: '1.6', marginBottom: '14px' }}>
                {evaluationResult.evaluation.praise}
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', fontWeight: 600 }}>
                <strong>Industry Reality:</strong> {evaluationResult.evaluation.real_world_application}
              </div>
            </div>

            {/* Dimension Shift Nudge */}
            {evaluationResult.dimensionShift && Object.keys(evaluationResult.dimensionShift).length > 0 && (
              <div className="brutal-card card-yellow" style={{ padding: '20px', marginBottom: '28px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '8px' }}>
                  [WHAT CHANGED IN YOUR HOLLAND PROFILE]
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {Object.entries(evaluationResult.dimensionShift).map(([dim, val]) => (
                    <span key={dim} className="sticker sticker-coral">
                      DIMENSION {dim}: +{Math.round((val as number) * 100)}% FROM THIS TRIAL
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginTop: '10px', fontWeight: 600 }}>
                  This nudges your exploration profile based on practical experience, not an aptitude verdict. You can always try other activities to test other fields!
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button id="btn-done-activity" className="btn-brutal btn-cobalt btn-brutal-lg" onClick={onClose}>
                Done & Return to Career Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
