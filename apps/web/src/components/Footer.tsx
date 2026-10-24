import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, Award, Compass, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const [clickedSticker, setClickedSticker] = useState<string | null>(null);

  const stickers = [
    { id: 'classes', text: 'CLASSES 9–12 ONLY', color: 'sticker-lime', rotate: '-3deg', icon: Compass },
    { id: 'explainable', text: '100% EXPLAINABLE MATCHING', color: 'sticker-yellow', rotate: '2deg', icon: Sparkles },
    { id: 'privacy', text: 'ZERO AADHAAR / PHONE REQ.', color: 'sticker-coral', rotate: '-2deg', icon: ShieldCheck },
    { id: 'gemma', text: 'GEMMA 4: 31B-IT EMPOWERED', color: 'sticker-cyan', rotate: '3deg', icon: Zap },
    { id: 'riasec', text: 'HOLLAND RIASEC PSYCHOMETRICS', color: 'sticker-purple', rotate: '-1deg', icon: Award },
    { id: 'verified', text: 'NCS & NCERT VERIFIED PATHWAYS', color: 'sticker-cobalt', rotate: '2deg', icon: CheckCircle2 },
  ];

  return (
    <footer
      style={{
        marginTop: '90px',
        borderTop: 'var(--border-thick) solid var(--border-ink)',
        background: '#FFFDF8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Sticker Marquee / Board */}
      <div
        style={{
          borderBottom: 'var(--border-width) solid var(--border-ink)',
          background: 'var(--accent-lime)',
          padding: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          boxShadow: 'inset 0 -2px 0 var(--border-ink)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginRight: '6px',
            background: 'var(--ink-primary)',
            color: 'var(--accent-lime)',
            padding: '3px 8px',
            borderRadius: '4px',
          }}
        >
          STUDENT STICKER BOARD ✦
        </span>

        {stickers.map((st) => {
          const Icon = st.icon;
          const isClicked = clickedSticker === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setClickedSticker(st.id)}
              className={`sticker ${st.color}`}
              style={{
                cursor: 'pointer',
                transform: isClicked ? 'scale(1.15) rotate(0deg)' : `rotate(${st.rotate})`,
                transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                userSelect: 'none',
              }}
              title="Click to stamp!"
            >
              <Icon className="w-3.5 h-3.5" />
              {st.text}
              {isClicked && ' ✓'}
            </button>
          );
        })}
      </div>

      <div className="container" style={{ paddingTop: '50px', paddingBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Col 1: Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--accent-cobalt)',
                  color: '#fff',
                  border: 'var(--border-width) solid var(--border-ink)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '2px 2px 0px var(--border-ink)',
                }}
              >
                <Compass className="w-4 h-4" />
              </div>
              <div style={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                PathLab India
              </div>
            </div>

            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
              A high-transparency career exploration workspace engineered specifically for secondary school students (Classes 9–12) across CBSE, ICSE, and State Boards in India.
            </p>

            <div
              className="brutal-card-static"
              style={{
                padding: '10px 14px',
                background: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--ink-primary)',
              }}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Minor Protection: No phone or Aadhaar stored</span>
            </div>
          </div>

          {/* Col 2: Official Portals */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '16px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="stamp">GOVT & ACADEMIC</span>
              Verified National Portals
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'National Career Service (NCS, GoI)', url: 'https://www.ncs.gov.in' },
                { name: 'NCERT Guidance & Counselling Wing', url: 'https://ncert.nic.in' },
                { name: 'National Testing Agency (JEE, NEET, CUET)', url: 'https://jeemain.nta.nic.in' },
                { name: 'Institute of Chartered Accountants (ICAI)', url: 'https://www.icai.org' },
              ].map((portal, idx) => (
                <li key={idx}>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-white btn-brutal-sm"
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span>{portal.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cobalt" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ethical Disclaimer & Guidance */}
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '16px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="stamp" style={{ background: 'var(--accent-yellow)' }}>IMPORTANT</span>
              Transparency & Ethics
            </div>

            <div
              className="brutal-card-static"
              style={{
                padding: '16px',
                background: '#FFFFFF',
                fontSize: '0.82rem',
                lineHeight: '1.55',
                color: 'var(--ink-secondary)',
              }}
            >
              <p style={{ marginBottom: '8px' }}>
                ✦ <strong>Exploration, Not Verdicts:</strong> Match scores reflect similarity between your expressed preferences and verified job attributes. They do <em>not</em> predict board exam marks, rank percentiles, or college allotment.
              </p>
              <p>
                ✦ <strong>Verified Benchmarks:</strong> All salary figures and course durations represent authentic industry entry ranges (INR LPA) from official Indian gazettes and survey baselines.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: 'var(--border-width) solid var(--border-ink)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--ink-muted)',
          }}
        >
          <div>
            © 2026 PathLab India · Powered by <strong>Google Gemma 4</strong> (31B-it Novita via HF Router)
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="sticker sticker-yellow" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
              RIASEC PSYCHOMETRICS
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: 'var(--ink-primary)' }}>
              Built for Indian Students <HeartHandshake className="w-4 h-4 text-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
