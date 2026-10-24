import React from 'react';
import { Compass, Sparkles, BookOpen, CheckCircle, Cpu, ArrowRight, ShieldCheck, Scale, Award } from 'lucide-react';

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
    <div className="animate-fade-in" style={{ padding: '60px 0 40px 0' }}>
      <div className="container">
        {/* Top Announcement Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div
            className="badge"
            style={{
              background: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--primary-400)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              padding: '6px 14px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Designed for Classes 9–12 · CBSE · ICSE · State Boards
          </div>
        </div>

        {/* Main Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Your Career Path Beyond Marks & Pressure
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            Stop choosing streams in the dark. Explore your authentic interests across hands-on activities, discover 15+ verified Indian career roadmaps, and test-drive real professional tasks before you decide your Class 11–12 subjects.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              id="hero-btn-start-quiz"
              className="btn btn-primary btn-lg"
              onClick={onStartQuiz}
            >
              <Compass className="w-5 h-5" />
              Take the 5-Minute Discovery Quiz
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-simulations"
              className="btn btn-secondary btn-lg"
              onClick={onExploreSimulations}
            >
              <Cpu className="w-5 h-5 text-teal-400" />
              Test-Drive Micro-Simulations
            </button>

            <button
              id="hero-btn-browse-careers"
              className="btn btn-ghost btn-lg"
              onClick={onBrowseCareers}
            >
              <BookOpen className="w-5 h-5" />
              Browse Career Catalog
            </button>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}
        >
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Scale className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
              Deterministic & Explainable
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              No mysterious AI black box. Career scores are calculated using a proven Holland RIASEC engine that itemizes exactly why each career was recommended.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(20, 184, 166, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Award className="w-5 h-5 text-teal-400" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
              Verified Indian Pathways
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              Real eligibility rules for JEE, NEET, CLAT, NID-DAT, UCEED, NDA, and CA Foundation, with realistic Indian entry & mid-level salary benchmarks (INR LPA).
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Cpu className="w-5 h-5 text-rose-400" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
              Try Before You Choose
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              Experience real tasks in 5 minutes: fix a transit app screen, solve a canteen sales mystery, or audit a contract clause, then watch your profile adapt.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
              Gemma 4 Mentorship
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
              Powered by Google's Gemma 4 (31B) to answer questions about daily routines, work stress, and alternatives—with 100% deterministic fallback resilience.
            </p>
          </div>
        </div>

        {/* Indian Academic Streams Quick-Reference */}
        <div className="glass-panel-elevated" style={{ padding: '36px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="badge badge-stream">Class 11–12 Stream Selector</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Map your interests to real board streams</span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px' }}>
            Explore Verified Careers Across All Major Indian Academic Streams
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>Science (PCM)</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Physics, Chemistry, Maths + CS/IP</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Software Engineer, Data Scientist, Aerospace, Architect</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>Science (PCB)</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Physics, Chemistry, Biology + Psych/Math</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Biomedical Researcher, Physiotherapist, Environmental Scientist</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '6px' }}>Commerce (with Math)</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Accounts, Economics, Math, Business</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Chartered Accountant, Investment Banker, Actuary</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#f472b6', marginBottom: '6px' }}>Humanities & Arts</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>History, Pol Science, Psych, Literature</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Corporate Lawyer, Civil Servant, Psychologist, Journalist</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, color: '#c084fc', marginBottom: '6px' }}>Design & Applied Tech</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Any Stream + Creative Portfolio</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>UX Designer, Product Designer, Digital Marketer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
