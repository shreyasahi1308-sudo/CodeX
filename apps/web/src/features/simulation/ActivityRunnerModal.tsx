import React, { useState, useEffect } from 'react';
import { TryActivity, api } from '../../lib/api';
import { X, Check, ArrowUp, ArrowDown, Sparkles, CheckCircle, AlertCircle, RefreshCw, Cpu, HelpCircle } from 'lucide-react';

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
        setTaskFeedback('Almost! Review the ticket screen: look at where the important QR code and the tiny validity date are located.');
        return;
      }
      setTaskFeedback('Great eye! You caught the critical usability bottlenecks. Now let’s reflect on what this reveals about your working style.');
      setTimeout(() => setStage('reflection'), 1200);
    } else if (activity?.type === 'canteen_detective') {
      if (selectedHypothesis !== 'hyp-2') {
        setTaskFeedback('Check the temperature column: notice what happens when temperatures exceed 36°C!');
        return;
      }
      setTaskFeedback('Brilliant correlation detection! Data shows temperature drives fruit bowl sales, completely disproving the manager’s hunch.');
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
          <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" style={{ margin: '0 auto 16px auto' }} />
          <p style={{ color: 'var(--text-muted)' }}>Loading interactive challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content animate-fade-in" style={{ padding: '36px', maxWidth: '820px' }}>
        <button
          id="btn-close-activity-modal"
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

        {/* Modal Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cluster">{activity.area}</span>
            <span className="badge badge-strong">
              <Cpu className="w-3.5 h-3.5" /> 5–8 Minute Micro-Challenge
            </span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
            {activity.title}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            {activity.scenario}
          </p>
        </div>

        {/* STAGE 1: THE INTERACTIVE TASK */}
        {stage === 'task' && (
          <div>
            <div
              style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                fontSize: '0.88rem',
                color: 'var(--text-main)',
              }}
            >
              <strong>Your Mission:</strong> {activity.instructions}
            </div>

            {/* Task Type: Screen Fixer */}
            {activity.type === 'screen_fixer' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* Left: Usability Flaw Checklist */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-teal)' }}>
                    Step 1: Check the Usability Flaws You Spot
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activity.interactiveData.screenMock.optionsFlaws.map((flaw: any) => {
                      const isChecked = selectedFlaws.includes(flaw.id);
                      return (
                        <div
                          key={flaw.id}
                          id={`flaw-${flaw.id}`}
                          onClick={() => toggleFlaw(flaw.id)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: isChecked ? 'rgba(20, 184, 166, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: isChecked ? '1px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              border: isChecked ? '1px solid var(--accent-teal)' : '1px solid var(--text-faint)',
                              background: isChecked ? 'var(--accent-teal)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 text-black" />}
                          </div>
                          <span>{flaw.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Rearrange Screen Elements */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--primary-400)' }}>
                    Step 2: Reorder Elements for Quick Boarding
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {screenElements.map((el, index) => (
                      <div
                        key={el.id}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.86rem',
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{el.name}</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            disabled={index === 0}
                            onClick={() => moveElement(index, 'up')}
                            style={{ padding: '4px 6px' }}
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
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
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-faint)' }}>
                        <th style={{ padding: '8px' }}>Day</th>
                        <th style={{ padding: '8px' }}>Temperature (°C)</th>
                        <th style={{ padding: '8px' }}>Fruit Bowls Sold</th>
                        <th style={{ padding: '8px' }}>Samosas Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.interactiveData.records.map((r: any, i: number) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{r.day}</td>
                          <td style={{ padding: '8px', color: r.tempC >= 36 ? '#fbbf24' : '#38bdf8', fontWeight: 700 }}>{r.tempC}°C</td>
                          <td style={{ padding: '8px' }}>{r.fruitBowlsSold}</td>
                          <td style={{ padding: '8px' }}>{r.samosasSold}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>
                  Which Conclusion is Supported by the Data?
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activity.interactiveData.hypotheses.map((h: any) => (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHypothesis(h.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        background: selectedHypothesis === h.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: selectedHypothesis === h.id ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
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
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: taskFeedback.includes('Great') || taskFeedback.includes('Brilliant') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: taskFeedback.includes('Great') || taskFeedback.includes('Brilliant') ? '#34d399' : '#fbbf24',
                  fontSize: '0.86rem',
                  marginBottom: '18px',
                }}
              >
                {taskFeedback}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button id="btn-submit-activity-task" className="btn btn-primary" onClick={verifyTask}>
                Submit Activity Answer
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: REFLECTION QUESTIONS */}
        {stage === 'reflection' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--accent-teal)' }}>
              <CheckCircle className="w-5 h-5" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Task Complete! Now Reflect on What You Felt</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              We do not measure how "smart" you are. We ask how it felt to do this work:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              {activity.reflectionQuestions.map((q, idx) => (
                <div key={q.id} className="glass-panel" style={{ padding: '18px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '12px' }}>
                    {idx + 1}. {q.prompt}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map(opt => {
                      const isSelected = reflectionAnswers[q.id] === opt.value;
                      return (
                        <div
                          key={opt.value}
                          id={`ref-opt-${opt.value}`}
                          onClick={() => setReflectionAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                            border: isSelected ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
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
                className="btn btn-primary"
                disabled={submittingReflection || Object.keys(reflectionAnswers).length === 0}
                onClick={handleReflectionSubmit}
              >
                {submittingReflection ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Evaluating Experience...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Finish & View Career Coaching
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: GEMMA COACHING FEEDBACK & PROFILE NUDGE */}
        {stage === 'feedback' && evaluationResult && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Career Coaching & Experience Nudge</h3>
            </div>

            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px', borderLeft: '4px solid var(--accent-teal)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#38bdf8', marginBottom: '6px' }}>
                Coach Evaluation:
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '10px' }}>
                {evaluationResult.evaluation.praise}
              </p>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                <strong>Industry Reality:</strong> {evaluationResult.evaluation.real_world_application}
              </div>
            </div>

            {/* What Changed in Profile Display */}
            {evaluationResult.dimensionShift && Object.keys(evaluationResult.dimensionShift).length > 0 && (
              <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px', background: 'rgba(99, 102, 241, 0.08)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--primary-400)', marginBottom: '6px' }}>
                  What Changed in Your Exploration Profile:
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {Object.entries(evaluationResult.dimensionShift).map(([dim, val]) => (
                    <span key={dim} className="badge badge-strong">
                      Dimension {dim}: +{Math.round((val as number) * 100)}% from this hands-on trial
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: '8px' }}>
                  This reflects one small hands-on experience, not a fixed psychometric verdict. You can always undo or test other activities.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button id="btn-done-activity" className="btn btn-primary" onClick={onClose}>
                Done & Return to Career Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
