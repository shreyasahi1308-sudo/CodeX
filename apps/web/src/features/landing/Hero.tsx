import React from 'react';
import { Compass, Sparkles, BookOpen, Cpu, ArrowRight, ShieldCheck, Scale, Award, CheckCircle2, Zap, Target } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onBrowseCareers: () => void;
  onExploreSimulations: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQuiz,
  onBrowseCareers,
  onExploreSimulations,
}) => {
  return (
    <div className="animate-fade-in" style={{ padding: '40px 0 60px 0' }}>
      <div className="container">
        {/* Top Editorial Banner & Stickers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="sticker sticker-lime sticker-rotate-left">
              ★ CLASS 9 TO 12 SPECIALIZED
            </span>
            <span className="sticker sticker-cyan">
              CBSE · ICSE · STATE BOARDS
            </span>
            <span className="stamp">
              VERIFIED INDIAN PATHWAYS 2026
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="sticker sticker-purple sticker-rotate-right">
              ⚡ POWERED BY GOOGLE GEMMA 4
            </span>
          </div>
        </div>

        {/* Hero Bento Grid (Inspired by the Bento Composition Reference) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* Main Hero Bento Card (Spans 8 columns) */}
          <div
            className="brutal-card brutal-card-lg"
            style={{
              gridColumn: 'span 8',
              padding: '44px 40px',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent-yellow)', border: '2px solid #121212', padding: '4px 10px', borderRadius: '4px', fontWeight: 800, fontSize: '0.78rem', marginBottom: '18px', textTransform: 'uppercase' }}>
                <Zap className="w-3.5 h-3.5 fill-black" /> Stop Choosing Streams In The Dark
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  marginBottom: '20px',
                  color: 'var(--ink-primary)',
                  textTransform: 'uppercase',
                }}
              >
                Find Your Career Path Beyond Marks & Pressure.
              </h1>

              <p
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '680px',
                  marginBottom: '32px',
                  fontWeight: 500,
                }}
              >
                Discover authentic career fits through hands-on activity ratings, explore 15+ verified Indian education roadmaps, and test-drive real professional tasks before locking in your Class 11–12 stream.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
                <button
                  id="hero-btn-start-quiz"
                  className="btn-brutal btn-lime btn-brutal-lg"
                  onClick={onStartQuiz}
                >
                  <Compass className="w-5 h-5" />
                  Take 5-Min Discovery Quiz
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  id="hero-btn-simulations"
                  className="btn-brutal btn-white btn-brutal-lg"
                  onClick={onExploreSimulations}
                >
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  Test-Drive Simulations
                </button>

                <button
                  id="hero-btn-browse-careers"
                  className="btn-brutal btn-ghost-brutal"
                  onClick={onBrowseCareers}
                >
                  <BookOpen className="w-4 h-4" />
                  Browse Catalog
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', fontSize: '0.82rem', color: 'var(--ink-muted)', flexWrap: 'wrap', fontFamily: 'var(--font-mono)' }}>
                <span>✓ NO MARKS OR GRADES REQUIRED</span>
                <span>✓ NO SIGNUP / LOCAL PERSISTENCE</span>
                <span>✓ 100% EXPLAINABLE HOLLAND RIASEC</span>
              </div>
            </div>
          </div>

          {/* Right Bento Box 1: Signature Feature Card (Spans 4 columns) */}
          <div
            className="brutal-card card-lime"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span className="sticker sticker-coral">SIGNATURE FEATURE</span>
                <span className="stamp">EXPERIENCE-FIRST</span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
                Try Before You Choose
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--ink-primary)', lineHeight: '1.5', marginBottom: '20px', fontWeight: 500 }}>
                Don't just read dry job summaries. In 5 minutes, solve a transit app UX flaw, investigate canteen sales data, or review CRISPR plant genetics!
              </p>

              <div style={{ background: '#FFFFFF', border: '2px solid var(--border-ink)', borderRadius: '8px', padding: '14px', marginBottom: '16px', boxShadow: '2px 2px 0px var(--border-ink)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    MICRO-TASK TEASER
                  </span>
                  <span className="badge" style={{ background: 'var(--accent-coral)', color: '#fff', fontSize: '0.65rem' }}>
                    5 MINS
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Fix Confusing Bus-Pass App</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>Spot 3 usability traps fumbling students at the scanner.</div>
              </div>
            </div>

            <button
              className="btn-brutal btn-white"
              style={{ width: '100%' }}
              onClick={onExploreSimulations}
            >
              Launch Simulation Lab <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Bento Row: 3 Accent Metric Cards */}
          {/* Bento Card 3: Verified Indian Exams (Spans 4 columns) */}
          <div
            className="brutal-card"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Award className="w-5 h-5 text-blue-600" />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Verified National Exams
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px' }}>
                Official Routes & Real Dates
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                Direct links to NTA, IITs, NID, ICAI, and Consortium of NLUs. No unverified dates or false coaching claims.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="sticker sticker-cyan">JEE ADV</span>
              <span className="sticker sticker-yellow">NEET-UG</span>
              <span className="sticker sticker-coral">CLAT</span>
              <span className="sticker sticker-lime">UCEED / NID</span>
              <span className="sticker sticker-purple">CA FOUNDATION</span>
            </div>
          </div>

          {/* Bento Card 4: Holland RIASEC Matcher (Spans 4 columns) */}
          <div
            className="brutal-card card-yellow"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Scale className="w-5 h-5 text-black" />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  Explainable Recommender
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '10px' }}>
                Zero AI Black-Box Bias
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-primary)', lineHeight: '1.5', marginBottom: '16px', fontWeight: 500 }}>
                Every score itemizes exact reason drivers: your favorite activities, subject affinities, and work environment preferences.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '2px solid var(--border-ink)', borderRadius: '6px', padding: '10px 12px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
              <div>[R] 68% · [I] 92% · [A] 84%</div>
              <div style={{ color: 'var(--ink-muted)', marginTop: '2px' }}>Top Driver: High Investigative + Creative</div>
            </div>
          </div>

          {/* Bento Card 5: Gemma 4 AI Mentor (Spans 4 columns) */}
          <div
            className="brutal-card card-dark"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', color: '#D4FF32', textTransform: 'uppercase' }}>
                  Gemma 4 (31B-it Novita)
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '10px', color: '#FFFFFF' }}>
                Interactive Career Mentor
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#D1D5DB', lineHeight: '1.5', marginBottom: '16px' }}>
                Ask questions about daily stress, entrance exams, or alternative routes. Backed by 100% deterministic fallback resilience.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>
              <span className="badge" style={{ background: '#22c55e', color: '#000', fontWeight: 800 }}>LIVE</span>
              <span>HF Router + Local Fallback</span>
            </div>
          </div>
        </div>

        {/* Indian Academic Streams Bento Section */}
        <div className="brutal-card" style={{ padding: '36px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span className="sticker sticker-cobalt" style={{ marginBottom: '8px' }}>
                CLASS 11–12 STREAM MAPPING
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, textTransform: 'uppercase' }}>
                Understand What Each Indian Stream Unlocks
              </h2>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              CBSE · ICSE · State Higher Secondary
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-ink)', borderRadius: '10px', padding: '18px', boxShadow: '3px 3px 0 var(--border-ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--accent-cobalt)' }}>Science (PCM)</span>
                <span className="stamp">ENGG / TECH</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                Physics, Chemistry, Maths + CS/IP
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                Software Engineer, Data Scientist, Aerospace Systems, Architecture.
              </div>
            </div>

            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-ink)', borderRadius: '10px', padding: '18px', boxShadow: '3px 3px 0 var(--border-ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#16a34a' }}>Science (PCB)</span>
                <span className="stamp">HEALTH / BIO</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                Physics, Chemistry, Biology + Psych
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                Biomedical Researcher, Physiotherapist, Genetics, Environmental Science.
              </div>
            </div>

            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-ink)', borderRadius: '10px', padding: '18px', boxShadow: '3px 3px 0 var(--border-ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#d97706' }}>Commerce (Math)</span>
                <span className="stamp">FINANCE</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                Accounts, Economics, Math, Business
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                Chartered Accountant (CA), Investment Banker, Actuary, CFA Route.
              </div>
            </div>

            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-ink)', borderRadius: '10px', padding: '18px', boxShadow: '3px 3px 0 var(--border-ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#db2777' }}>Humanities & Arts</span>
                <span className="stamp">LAW / POLICY</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                History, Pol Science, Psych, English
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                Corporate Lawyer (CLAT), Civil Servant (UPSC), Clinical Psychologist.
              </div>
            </div>

            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-ink)', borderRadius: '10px', padding: '18px', boxShadow: '3px 3px 0 var(--border-ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#9333ea' }}>Design & Media</span>
                <span className="stamp">CREATIVE</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                Any Stream + Creative Aptitude
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: '1.4' }}>
                UX / Product Designer (UCEED/NID), Brand Strategist, Media Creator.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
