import React from 'react';
import { ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: '80px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(9, 13, 22, 0.95)',
        padding: '50px 0 30px 0',
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px', color: '#fff' }}>
              PathLab India
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
              AI-assisted, transparent career exploration built specifically for secondary school students in Classes 9–12 across CBSE, ICSE, and State Boards.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-teal)', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck className="w-4 h-4" />
              Privacy-first: No accounts, no Aadhaar/phone required
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '14px', color: '#fff' }}>
              Verified Official Resources
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href="https://www.ncs.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  National Career Service (NCS, GoI) <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ncert.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  NCERT Career & Guidance Wing <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://jeemain.nta.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  National Testing Agency (NTA Exams) <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.icai.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Institute of Chartered Accountants (ICAI) <ExternalLink className="w-3 h-3 text-indigo-400" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '14px', color: '#fff' }}>
              Admissions & Transparency Disclaimer
            </div>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.82rem', lineHeight: '1.6' }}>
              Career match scores reflect similarity between your self-reported interests and verified job role characteristics. They do <strong>not</strong> predict board exam marks, entrance test percentiles, college seat allotment, or future career earnings.
            </p>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.82rem', lineHeight: '1.6', marginTop: '10px' }}>
              Exam eligibility, dates, and reservation rules are revised annually by conducting bodies. Always verify official notifications.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem', color: 'var(--text-faint)' }}>
          <div>© 2026 PathLab India · Powered by Google Gemma 4 (31B-it Novita via Hugging Face Router)</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span>Deterministic Recommendation Engine v1.0</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Made for Indian Students <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
