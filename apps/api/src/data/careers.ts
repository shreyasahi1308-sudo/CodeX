import { Career } from '../types/index.js';

export const careersData: Career[] = [
  {
    id: 'ux-designer',
    name: 'UX / Product Designer',
    cluster: 'design-creative-tech',
    clusterName: 'Design & Creative Tech',
    summary: 'Designs intuitive mobile apps and digital interfaces by understanding user behavior and prototyping visual interactions.',
    dayInLife: [
      'Conduct user interviews and observe people navigating mobile apps to spot friction points',
      'Create wireframes, clickable prototypes, and design systems in Figma',
      'Collaborate closely with software engineers and product managers to ensure designs can be built effectively'
    ],
    riasec: { A: 1.0, I: 0.6, S: 0.3 },
    subjects: ['computer-science', 'art-design', 'psychology'],
    skills: ['design-thinking', 'creativity', 'communication', 'problem-solving'],
    developableSkills: ['design-thinking', 'coding', 'communication'],
    environments: ['studio', 'office', 'flexible-remote'],
    salaryRange: {
      currency: 'INR',
      entry: '₹6 – ₹11 LPA',
      mid: '₹18 – ₹38 LPA',
      note: 'High variance based on product design portfolio quality and tech firm scale.'
    },
    pathways: [
      {
        title: 'Design Institute Degree Route (B.Des)',
        streamRequired: 'Any stream in Class 11–12 (Science, Commerce, or Humanities)',
        steps: [
          'Complete Class 12 in any stream with a focus on visual or creative projects',
          'Appear for national design entrance examinations: UCEED, NID DAT, or SEED',
          'Pursue a 4-year Bachelor of Design (B.Des) at NID, IIT Bombay (IDC), IIT Delhi, or private design universities',
          'Complete design studio internships and build a public portfolio (e.g., Behance/Dribbble)'
        ],
        exams: [
          { name: 'UCEED (IIT Bombay)', officialUrl: 'https://www.uceed.iitb.ac.in', verified: true, frequency: 'Annual (January)' },
          { name: 'NID DAT (National Institute of Design)', officialUrl: 'https://admissions.nid.edu', verified: true, frequency: 'Annual (December/January)' }
        ],
        note: 'No mandatory mathematics requirement for most B.Des colleges, but spatial and visual aptitude are tested.'
      },
      {
        title: 'Computer Science / Engineering Hybrid Route',
        streamRequired: 'Science (PCM) in Class 11–12',
        steps: [
          'Pursue B.Tech in CSE / IT or Human-Computer Interaction',
          'Build frontend web/mobile projects and self-study UX research principles',
          'Transition into UI/UX engineering or product design roles'
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Fix the Confusing Transit Pass Screen', kind: 'trial', duration: '6 mins' },
      { title: 'Read: Don Norman’s Design of Everyday Things (Summary)', kind: 'read', duration: '15 mins' },
      { title: 'Audit your most-used smartphone app and list 3 user pain points', kind: 'do', duration: '20 mins' }
    ],
    trialActivityId: 'ux-screen-fixer',
    adjacent: ['data-scientist', 'software-engineer', 'digital-marketer'],
    sources: [
      { title: 'NID Admissions Information Handbook', url: 'https://admissions.nid.edu', publisher: 'National Institute of Design' },
      { title: 'National Career Service: UX Designer Profile', url: 'https://www.ncs.gov.in', publisher: 'Ministry of Labour & Employment, GoI' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Design tool stacks evolve rapidly (AI generative UI tools are altering entry-level wireframing)',
      'Entry-level hiring relies almost 80% on a verifiable portfolio rather than degree brand alone'
    ]
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist & AI Specialist',
    cluster: 'data-computing',
    clusterName: 'Data & Computing',
    summary: 'Analyzes complex datasets and builds predictive machine learning models to solve business and scientific challenges.',
    dayInLife: [
      'Clean, transform, and explore large datasets using Python and SQL',
      'Train, fine-tune, and evaluate statistical machine learning or deep learning models',
      'Present visual dashboards and data insights to decision-makers and stakeholders'
    ],
    riasec: { I: 1.0, C: 0.6, A: 0.3 },
    subjects: ['mathematics', 'computer-science', 'economics'],
    skills: ['data-analysis', 'coding', 'logical-reasoning', 'problem-solving'],
    developableSkills: ['coding', 'data-analysis', 'research-methods'],
    environments: ['office', 'flexible-remote'],
    salaryRange: {
      currency: 'INR',
      entry: '₹7 – ₹14 LPA',
      mid: '₹22 – ₹45 LPA',
      note: 'Significant premium for strong statistical foundation and generative AI engineering.'
    },
    pathways: [
      {
        title: 'Statistics / Mathematics Undergrad Route',
        streamRequired: 'Science (PCM) or Commerce with High Mathematics',
        steps: [
          'Class 11–12 with Mathematics (minimum 60%+)',
          'Appear for ISI Admission Test, CMI Entrance, or CUET-UG (Maths/Stats)',
          'Complete B.Stat / B.Math at Indian Statistical Institute (ISI Kolkata/Bangalore) or B.Sc Statistics at DU / top universities',
          'Pursue M.Stat / M.Sc Data Science or transition directly into junior data analyst roles'
        ],
        exams: [
          { name: 'ISI Admission Test (Indian Statistical Institute)', officialUrl: 'https://www.isical.ac.in', verified: true },
          { name: 'CUET-UG (NTA)', officialUrl: 'https://cuetug.ntaonline.in', verified: true }
        ],
        note: 'ISI entrance is proof-based and mathematically rigorous.'
      },
      {
        title: 'B.Tech Computer Science / AI Route',
        streamRequired: 'Science (PCM)',
        steps: [
          'Appear for JEE Main & JEE Advanced',
          'Complete B.Tech in CSE / Data Science / AI at IITs, NITs, IIITs, or BITS',
          'Work on Kaggle datasets, open-source AI projects, and machine learning internships'
        ],
        exams: [
          { name: 'JEE Main (NTA)', officialUrl: 'https://jeemain.nta.nic.in', verified: true },
          { name: 'JEE Advanced (IITs)', officialUrl: 'https://jeeadv.ac.in', verified: true }
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: School Canteen Data Detective', kind: 'trial', duration: '5 mins' },
      { title: 'Explore: Analyze India Census open data using a spreadsheet', kind: 'do', duration: '25 mins' }
    ],
    trialActivityId: 'data-canteen-detective',
    adjacent: ['software-engineer', 'cybersecurity-analyst', 'investment-banker'],
    sources: [
      { title: 'Indian Statistical Institute Academic Programme Catalog', url: 'https://www.isical.ac.in', publisher: 'ISI Kolkata' },
      { title: 'NASSCOM FutureSkills Prime Career Architecture', url: 'https://futureskillsprime.in', publisher: 'NASSCOM / MeitY' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Basic data cleaning is increasingly automated; value is shifting to domain understanding and model evaluation'
    ]
  },
  {
    id: 'biomedical-researcher',
    name: 'Biomedical & Genetics Researcher',
    cluster: 'health-life-sciences',
    clusterName: 'Health & Life Sciences',
    summary: 'Investigates molecular biology, human diseases, and novel therapeutics through controlled laboratory experiments.',
    dayInLife: [
      'Design cell-culture, biochemical, or DNA sequencing assays in a sterile laboratory',
      'Analyze microscope imaging and molecular data using bioinformatics tools',
      'Write peer-reviewed research papers and collaborate with clinical scientists'
    ],
    riasec: { I: 1.0, R: 0.6, S: 0.3 },
    subjects: ['biology', 'chemistry', 'physics'],
    skills: ['lab-skills', 'research-methods', 'problem-solving', 'logical-reasoning'],
    developableSkills: ['lab-skills', 'research-methods', 'data-analysis'],
    environments: ['lab'],
    salaryRange: {
      currency: 'INR',
      entry: '₹4.5 – ₹8 LPA',
      mid: '₹14 – ₹30 LPA',
      note: 'Academia/CSIR pays fellowship scale; private biotech and pharma R&D pay higher corporate packages.'
    },
    pathways: [
      {
        title: 'Pure Sciences Research Route (BS-MS)',
        streamRequired: 'Science (PCB or PCMB) in Class 11–12',
        steps: [
          'Complete Class 12 with Physics, Chemistry, Biology (or Mathematics)',
          'Appear for IAT (IISER Aptitude Test) or NEST (NISER)',
          'Complete 5-year integrated BS-MS at IISc Bangalore or IISERs (Pune, Mohali, Kolkata, etc.)',
          'Qualify CSIR-UGC NET JRF or GATE for PhD fellowship'
        ],
        exams: [
          { name: 'IAT (IISER Aptitude Test)', officialUrl: 'https://iiseradmission.in', verified: true },
          { name: 'NEST (NISER / CEBS)', officialUrl: 'https://www.nestexam.in', verified: true }
        ],
        note: 'IISc and IISERs offer full government scholarship stipends (INSPIRE / KVPY equivalent) to top students.'
      },
      {
        title: 'B.Tech Biotechnology Route',
        streamRequired: 'Science (PCB or PCM)',
        steps: [
          'Appear for JEE Main or CUET-UG Biotechnology',
          'Complete B.Tech in Biotechnology or Genetic Engineering',
          'Work in biopharma, vaccine manufacturing, or bio-computing labs'
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Plant Genetics Lab Simulation', kind: 'trial', duration: '7 mins' },
      { title: 'Watch: How mRNA vaccines were created (CSIR-CCMB)', kind: 'watch', duration: '12 mins' }
    ],
    trialActivityId: 'bio-plant-lab',
    adjacent: ['clinical-psychologist', 'sports-physiotherapist', 'environmental-scientist'],
    sources: [
      { title: 'IISc Undergraduate Programmes', url: 'https://iisc.ac.in/admissions/undergraduate/', publisher: 'Indian Institute of Science' },
      { title: 'DBT Biotechnology Career Guide', url: 'https://dbtindia.gov.in', publisher: 'Department of Biotechnology, GoI' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Pure research paths often require a PhD (5+ years beyond graduation) before independent scientist roles'
    ]
  },
  {
    id: 'clinical-psychologist',
    name: 'Clinical & Child Psychologist',
    cluster: 'health-life-sciences',
    clusterName: 'Health & Life Sciences',
    summary: 'Assesses mental health, conducts cognitive evaluations, and delivers therapeutic counseling to help individuals overcome behavioral challenges.',
    dayInLife: [
      'Conduct structured clinical interviews and psychological assessments with clients',
      'Develop evidence-based therapy plans (Cognitive Behavioral Therapy, play therapy)',
      'Maintain confidential clinical notes and consult with psychiatrists or school counselors'
    ],
    riasec: { S: 1.0, I: 0.6, A: 0.3 },
    subjects: ['psychology', 'biology', 'languages-literature'],
    skills: ['communication', 'problem-solving', 'research-methods', 'teamwork'],
    developableSkills: ['communication', 'research-methods', 'writing'],
    environments: ['people-facing', 'office'],
    salaryRange: {
      currency: 'INR',
      entry: '₹4 – ₹7.5 LPA',
      mid: '₹12 – ₹26 LPA',
      note: 'Independent private practice and corporate mental health consulting offer uncapped earnings with experience.'
    },
    pathways: [
      {
        title: 'RCI-Licensed Clinical Psychologist Route',
        streamRequired: 'Any stream in Class 11–12 (Psychology / Biology elective helpful)',
        steps: [
          'Complete Class 12 with any stream (CBSE/ICSE/State boards)',
          'Appear for CUET-UG for B.A. (Hons) or B.Sc in Psychology (DU, Christ, BHU, Jamia)',
          'Complete M.A. / M.Sc in Clinical Psychology',
          'Complete 2-year M.Phil in Clinical Psychology (from RCI-approved institutes like NIMHANS Bangalore, CIP Ranchi, or IHBAS Delhi)',
          'Register with the Rehabilitation Council of India (RCI) to practice legally as a Clinical Psychologist'
        ],
        exams: [
          { name: 'CUET-UG (Psychology)', officialUrl: 'https://cuetug.ntaonline.in', verified: true },
          { name: 'NIMHANS M.Phil Entrance', officialUrl: 'https://nimhans.ac.in', verified: true }
        ],
        note: 'Practicing clinical therapy in hospitals in India legally mandates RCI certification.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Empathy & Supportive Listening Scenario', kind: 'trial', duration: '5 mins' },
      { title: 'Read: NCERT Psychology Class 11 Chapter 1 (What is Psychology)', kind: 'read', duration: '20 mins' }
    ],
    trialActivityId: 'psych-listen-respond',
    adjacent: ['biomedical-researcher', 'sports-physiotherapist', 'corporate-lawyer'],
    sources: [
      { title: 'NIMHANS Academic Guidelines', url: 'https://nimhans.ac.in/academic-programmes', publisher: 'National Institute of Mental Health and Neurosciences' },
      { title: 'Rehabilitation Council of India Statutory Guidelines', url: 'https://rehabcouncil.nic.in', publisher: 'RCI New Delhi' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'The National Commission for Allied and Healthcare Professions (NCAHP) Act is restructuring psychology licensing in India'
    ]
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer & Systems Architect',
    cluster: 'data-computing',
    clusterName: 'Data & Computing',
    summary: 'Designs, builds, tests, and deploys scalable software applications, backend microservices, and distributed cloud systems.',
    dayInLife: [
      'Write clean, modular code in TypeScript, Python, Java, or Go',
      'Review peer code pull requests and design database schemas',
      'Debug production latency issues and optimize algorithms for high concurrency'
    ],
    riasec: { I: 1.0, R: 0.6, C: 0.3 },
    subjects: ['computer-science', 'mathematics', 'physics'],
    skills: ['coding', 'problem-solving', 'logical-reasoning', 'teamwork'],
    developableSkills: ['coding', 'problem-solving', 'data-analysis'],
    environments: ['office', 'flexible-remote'],
    salaryRange: {
      currency: 'INR',
      entry: '₹6 – ₹15 LPA',
      mid: '₹22 – ₹55 LPA',
      note: 'Tier-1 tech product firms, high-frequency trading firms, and global SaaS companies offer ₹30L+ starting CTC.'
    },
    pathways: [
      {
        title: 'B.Tech / B.E. Engineering Route',
        streamRequired: 'Science (PCM) in Class 11–12',
        steps: [
          'Study Physics, Chemistry, and Mathematics in Class 11–12',
          'Appear for JEE Main and JEE Advanced (for IITs), BITSAT, or State CETs (KCET, MHT-CET, WBJEE)',
          'Pursue 4-year B.Tech / B.E. in Computer Science, Software Engineering, or Information Technology',
          'Contribute to open-source software, participate in hackathons, and complete software engineering internships'
        ],
        exams: [
          { name: 'JEE Main (NTA)', officialUrl: 'https://jeemain.nta.nic.in', verified: true },
          { name: 'JEE Advanced', officialUrl: 'https://jeeadv.ac.in', verified: true },
          { name: 'BITSAT (BITS Pilani)', officialUrl: 'https://bitsadmission.com', verified: true }
        ],
        note: 'Mathematics is an absolute statutory prerequisite for engineering entrance across India.'
      },
      {
        title: 'BCA to MCA / Industry Direct Route',
        streamRequired: 'Any stream with Mathematics or Computer Science',
        steps: [
          'Complete Class 12 with Math/CS',
          'Pursue BCA (Bachelor of Computer Applications)',
          'Appear for NIMCET for MCA admission into NITs, or build verified open-source portfolios'
        ],
        exams: [
          { name: 'NIMCET (NIT MCA Common Entrance Test)', officialUrl: 'https://nimcet.admissions.nic.in', verified: true }
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Logic & Bug Hunt Challenge', kind: 'trial', duration: '6 mins' },
      { title: 'Build: Create a personal portfolio page in HTML/CSS/JS', kind: 'do', duration: '45 mins' }
    ],
    trialActivityId: 'sw-bug-hunt',
    adjacent: ['data-scientist', 'cybersecurity-analyst', 'ux-designer'],
    sources: [
      { title: 'Joint Entrance Examination (Main) Information Bulletin', url: 'https://jeemain.nta.nic.in', publisher: 'National Testing Agency' },
      { title: 'All India Council for Technical Education (AICTE) Guidelines', url: 'https://www.aicte-india.org', publisher: 'AICTE' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'AI code generation is raising expectations: engineers now focus more on system architecture and code correctness than repetitive boilerplate'
    ]
  },
  {
    id: 'chartered-accountant',
    name: 'Chartered Accountant (CA)',
    cluster: 'business-finance',
    clusterName: 'Business & Finance',
    summary: 'Audits financial statements, designs corporate tax strategies, and provides statutory financial compliance advice to companies.',
    dayInLife: [
      'Audit balance sheets, cash flows, and profit-and-loss accounts for statutory compliance',
      'Advise corporate leadership on direct/indirect taxation, GST, and merger structuring',
      'Assess internal business financial controls and present audit reports to Boards of Directors'
    ],
    riasec: { C: 1.0, E: 0.6, I: 0.3 },
    subjects: ['accountancy', 'economics', 'business-studies', 'mathematics'],
    skills: ['financial-literacy', 'logical-reasoning', 'problem-solving', 'communication'],
    developableSkills: ['financial-literacy', 'data-analysis', 'problem-solving'],
    environments: ['office'],
    salaryRange: {
      currency: 'INR',
      entry: '₹8 – ₹14 LPA',
      mid: '₹22 – ₹45 LPA',
      note: 'Big 4 audit firms (EY, PwC, Deloitte, KPMG) and MNC investment banks recruit campus CAs at strong entry packages.'
    },
    pathways: [
      {
        title: 'ICAI Direct CA Examination Route',
        streamRequired: 'Commerce or Any stream in Class 11–12 (Maths recommended)',
        steps: [
          'Register with the Institute of Chartered Accountants of India (ICAI) after Class 10/12',
          'Appear for and pass CA Foundation Examination (conducted twice a year)',
          'Clear CA Intermediate (Group 1 & Group 2 exams)',
          'Complete 2 years of mandatory practical articleship training under a practicing Chartered Accountant',
          'Pass the CA Final Examination and receive ICAI Membership'
        ],
        exams: [
          { name: 'CA Foundation (ICAI)', officialUrl: 'https://www.icai.org', verified: true, frequency: 'Twice a year (June/December)' },
          { name: 'CA Intermediate & Final', officialUrl: 'https://www.icai.org', verified: true }
        ],
        note: 'College degree is optional; many students pursue B.Com simultaneously through correspondence or regular college.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Balance Sheet Detective', kind: 'trial', duration: '6 mins' },
      { title: 'Read: How the Union Budget of India works', kind: 'read', duration: '15 mins' }
    ],
    trialActivityId: 'ca-balance-sheet',
    adjacent: ['investment-banker', 'corporate-lawyer', 'data-scientist'],
    sources: [
      { title: 'ICAI New Scheme of Education and Training', url: 'https://www.icai.org/post/new-scheme-of-education-and-training', publisher: 'Institute of Chartered Accountants of India' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Pass percentages for CA Final have historically hovered between 10% and 22%, requiring disciplined self-study'
    ]
  },
  {
    id: 'corporate-lawyer',
    name: 'Corporate Lawyer & Legal Counsel',
    cluster: 'law-public-service',
    clusterName: 'Law & Public Service',
    summary: 'Drafts commercial contracts, advises enterprises on regulatory compliance, and negotiates mergers, acquisitions, and dispute settlements.',
    dayInLife: [
      'Draft, review, and negotiate shareholder agreements, commercial leases, and vendor contracts',
      'Conduct legal due diligence on target companies during investments and acquisitions',
      'Advise startup founders on regulatory compliance under SEBI, RBI, and corporate laws'
    ],
    riasec: { E: 1.0, I: 0.6, C: 0.3 },
    subjects: ['history-social-science', 'languages-literature', 'economics'],
    skills: ['logical-reasoning', 'writing', 'public-speaking', 'communication'],
    developableSkills: ['writing', 'public-speaking', 'communication'],
    environments: ['office', 'people-facing'],
    salaryRange: {
      currency: 'INR',
      entry: '₹7 – ₹16 LPA',
      mid: '₹25 – ₹60 LPA',
      note: 'Top tier-1 Indian law firms (Shardul Amarchand, Cyril Amarchand, Khaitan, Trilegal, AZB) offer ₹14–18 LPA starting CTC.'
    },
    pathways: [
      {
        title: '5-Year Integrated B.A. LL.B / BBA LL.B via CLAT',
        streamRequired: 'Any stream in Class 11–12 (Humanities, Commerce, or Science)',
        steps: [
          'Appear for the Common Law Admission Test (CLAT) or AILET (for NLU Delhi) in Class 12',
          'Secure admission to a premier National Law University (NLSIU Bangalore, NALSAR Hyderabad, WBNUJS Kolkata, NLU Delhi)',
          'Complete the 5-year integrated law degree with moot court competitions and corporate firm internships',
          'Enroll with the State Bar Council and pass the All India Bar Examination (AIBE)'
        ],
        exams: [
          { name: 'CLAT (Consortium of National Law Universities)', officialUrl: 'https://consortiumofnlus.ac.in', verified: true, frequency: 'Annual (December)' },
          { name: 'AILET (NLU Delhi)', officialUrl: 'https://nationallawuniversitydelhi.in', verified: true, frequency: 'Annual (December)' }
        ],
        note: 'CLAT tests English comprehension, Current Affairs/GK, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Mock Contract Clause Risk Audit', kind: 'trial', duration: '6 mins' },
      { title: 'Watch: A Day in the Life of an Associate at a Top Law Firm', kind: 'watch', duration: '10 mins' }
    ],
    trialActivityId: 'law-contract-audit',
    adjacent: ['chartered-accountant', 'civil-servant', 'clinical-psychologist'],
    sources: [
      { title: 'Consortium of National Law Universities CLAT Notification', url: 'https://consortiumofnlus.ac.in', publisher: 'Consortium of NLUs' },
      { title: 'Bar Council of India Legal Education Rules', url: 'http://www.barcouncilofindia.org', publisher: 'Bar Council of India' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'High billing targets and intense work hours (60+ hours/week) are standard in tier-1 corporate law practices'
    ]
  },
  {
    id: 'investment-banker',
    name: 'Investment Banker & Equity Analyst',
    cluster: 'business-finance',
    clusterName: 'Business & Finance',
    summary: 'Builds financial valuation models, advises corporations on raising capital, and structures debt and equity deals.',
    dayInLife: [
      'Build discounted cash flow (DCF) and leverage buyout (LBO) financial valuation models in Excel',
      'Prepare confidential pitch decks and investment memorandums for institutional investors',
      'Analyze industry sector trends, earnings reports, and macroeconomic shifts'
    ],
    riasec: { E: 1.0, C: 0.6, I: 0.3 },
    subjects: ['economics', 'accountancy', 'mathematics'],
    skills: ['financial-literacy', 'data-analysis', 'problem-solving', 'leadership'],
    developableSkills: ['financial-literacy', 'data-analysis', 'communication'],
    environments: ['office'],
    salaryRange: {
      currency: 'INR',
      entry: '₹10 – ₹20 LPA',
      mid: '₹35 – ₹80 LPA',
      note: 'Base salaries are supplemented by substantial annual performance bonuses.'
    },
    pathways: [
      {
        title: 'BBA / B.Com to MBA Route',
        streamRequired: 'Commerce with Math or Science (PCM)',
        steps: [
          'Appear for IPMAT (IIM Indore/Rohtak 5-Year Integrated Program) or CUET-UG for B.Com (Hons) / B.A. Economics at SRCC, St. Stephen’s, Shaheed Sukhdev College of Business Studies (SSCBS)',
          'Complete bachelor’s with high GPA and finance society leadership',
          'Appear for CAT (Common Admission Test) for IIM Ahmedabad, Bangalore, Calcutta, or pursue global CFA charter',
          'Join global investment banking analysts or private equity associates'
        ],
        exams: [
          { name: 'IPMAT (IIM Indore)', officialUrl: 'https://www.iimidr.ac.in', verified: true },
          { name: 'CUET-UG (DU / Central Universities)', officialUrl: 'https://cuetug.ntaonline.in', verified: true }
        ],
        note: 'High mathematical fluency and competitive test scores are standard gatekeepers.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Fest Stall Capital Allocation Simulation', kind: 'trial', duration: '6 mins' },
      { title: 'Analyze: Read the financial statement of Zomato or Tata Motors', kind: 'read', duration: '20 mins' }
    ],
    trialActivityId: 'finance-stall-allocator',
    adjacent: ['chartered-accountant', 'data-scientist', 'corporate-lawyer'],
    sources: [
      { title: 'IIM Indore IPM Programme Details', url: 'https://www.iimidr.ac.in', publisher: 'Indian Institute of Management Indore' },
      { title: 'CFA Institute India Career Insights', url: 'https://www.cfainstitute.org', publisher: 'CFA Institute' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Junior analyst roles involve intense desk time and high-pressure deliverables during deal closings'
    ]
  },
  {
    id: 'aerospace-engineer',
    name: 'Aerospace & Satellite Systems Engineer',
    cluster: 'engineering-making',
    clusterName: 'Engineering & Making',
    summary: 'Designs, manufactures, and tests spacecraft, rocket propulsion systems, satellites, and high-altitude aerodynamic structures.',
    dayInLife: [
      'Model aerodynamic flow and thermodynamic stress using computational fluid dynamics (CFD)',
      'Conduct hardware-in-the-loop tests on satellite attitude control and avionics sensors',
      'Collaborate with national space missions (ISRO) or private aerospace manufacturing firms'
    ],
    riasec: { R: 1.0, I: 0.6, C: 0.3 },
    subjects: ['physics', 'mathematics', 'chemistry'],
    skills: ['problem-solving', 'logical-reasoning', 'coding', 'teamwork'],
    developableSkills: ['problem-solving', 'coding', 'data-analysis'],
    environments: ['lab', 'office'],
    salaryRange: {
      currency: 'INR',
      entry: '₹6 – ₹12 LPA',
      mid: '₹18 – ₹40 LPA',
      note: 'ISRO scientist positions follow 7th Central Pay Commission scales; private space startups (Skyroot, Agnikul) offer market packages.'
    },
    pathways: [
      {
        title: 'IIST / IIT Aerospace Engineering Route',
        streamRequired: 'Science (PCM) in Class 11–12',
        steps: [
          'Study Physics, Chemistry, and Mathematics in Class 11–12',
          'Appear for JEE Main and JEE Advanced',
          'Apply for B.Tech in Aerospace Engineering or Avionics at IIST (Indian Institute of Space Science and Technology, Thiruvananthapuram) or IIT Bombay/Madras/Kanpur',
          'Top IIST graduates with qualifying CGPA are directly absorbed into ISRO centers as Scientist/Engineer-SC'
        ],
        exams: [
          { name: 'JEE Advanced', officialUrl: 'https://jeeadv.ac.in', verified: true },
          { name: 'IIST Admission via JEE Advanced', officialUrl: 'https://www.iist.ac.in/admissions/undergraduate', verified: true }
        ],
        note: 'Absorption into ISRO depends on maintaining a minimum prescribed CGPA throughout the degree.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Rocket Trajectory & Fuel Allocation', kind: 'trial', duration: '6 mins' },
      { title: 'Watch: How ISRO Chandrayaan-3 lander was designed and tested', kind: 'watch', duration: '15 mins' }
    ],
    trialActivityId: 'aero-rocket-trajectory',
    adjacent: ['software-engineer', 'robotics-engineer', 'biomedical-researcher'],
    sources: [
      { title: 'IIST Academic & Absorption Brochure', url: 'https://www.iist.ac.in', publisher: 'Indian Institute of Space Science and Technology' },
      { title: 'ISRO Recruitment Board (ICRB) Guidelines', url: 'https://www.isro.gov.in', publisher: 'ISRO' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Very few pure aerospace manufacturing facilities exist in India compared to software; research roles are concentrated in government centers'
    ]
  },
  {
    id: 'environmental-scientist',
    name: 'Environmental Scientist & Climate Analyst',
    cluster: 'health-life-sciences',
    clusterName: 'Health & Life Sciences',
    summary: 'Measures carbon footprints, monitors ecosystem health, assesses water/air contamination, and designs sustainable conservation plans.',
    dayInLife: [
      'Collect air, soil, and aquatic samples from field conservation areas and industrial zones',
      'Analyze geospatial GIS satellite imagery to track deforestation and urban heat islands',
      'Prepare Environmental Impact Assessment (EIA) reports for government bodies and green infrastructure projects'
    ],
    riasec: { I: 1.0, R: 0.6, S: 0.3 },
    subjects: ['biology', 'chemistry', 'history-social-science'],
    skills: ['research-methods', 'lab-skills', 'data-analysis', 'problem-solving'],
    developableSkills: ['research-methods', 'data-analysis', 'writing'],
    environments: ['outdoors-field', 'lab', 'office'],
    salaryRange: {
      currency: 'INR',
      entry: '₹4.5 – ₹8 LPA',
      mid: '₹14 – ₹28 LPA',
      note: 'Corporate ESG (Environmental, Social, and Governance) consulting in MNCs offers growing compensation.'
    },
    pathways: [
      {
        title: 'B.Sc / B.Tech Environmental Sciences Route',
        streamRequired: 'Science (PCB or PCM) in Class 11–12',
        steps: [
          'Complete Class 12 with Science stream',
          'Appear for CUET-UG or institute-level entrance tests',
          'Complete B.Sc in Environmental Science or B.Tech in Environmental Engineering',
          'Pursue M.Sc or GIS remote sensing certifications'
        ],
        exams: [
          { name: 'CUET-UG', officialUrl: 'https://cuetug.ntaonline.in', verified: true }
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Watershed Water Quality Analysis', kind: 'trial', duration: '6 mins' },
      { title: 'Explore: Check real-time Air Quality Index (AQI) in 3 Indian cities', kind: 'do', duration: '15 mins' }
    ],
    trialActivityId: 'env-water-analysis',
    adjacent: ['biomedical-researcher', 'civil-servant', 'data-scientist'],
    sources: [
      { title: 'CPCB Guidelines on Environmental Impact Assessment', url: 'https://cpcb.nic.in', publisher: 'Central Pollution Control Board, GoI' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Field work in extreme climates and remote locations is common during early-career environmental sampling'
    ]
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst & Ethical Hacker',
    cluster: 'data-computing',
    clusterName: 'Data & Computing',
    summary: 'Defends computer systems, networks, and confidential data against malicious breaches, vulnerability exploits, and cyberattacks.',
    dayInLife: [
      'Conduct authorized penetration testing and vulnerability scans across corporate networks',
      'Monitor security operations center (SOC) alerts and investigate suspicious network intrusions',
      'Configure cryptographic protocols and train organizations on anti-phishing defense'
    ],
    riasec: { C: 1.0, I: 0.6, R: 0.3 },
    subjects: ['computer-science', 'mathematics', 'physics'],
    skills: ['coding', 'problem-solving', 'logical-reasoning', 'research-methods'],
    developableSkills: ['coding', 'problem-solving', 'data-analysis'],
    environments: ['office', 'flexible-remote'],
    salaryRange: {
      currency: 'INR',
      entry: '₹6 – ₹13 LPA',
      mid: '₹20 – ₹42 LPA',
      note: 'Critical shortage of skilled cybersecurity professionals in banking, defense, and cloud sectors.'
    },
    pathways: [
      {
        title: 'B.Tech CSE with Cyber Security Specialization',
        streamRequired: 'Science (PCM) in Class 11–12',
        steps: [
          'Appear for JEE Main / State CETs',
          'Complete B.Tech in CSE / Information Security / Cyber Forensics',
          'Earn certified industry credentials (CompTIA Security+, CEH - Certified Ethical Hacker, OSCP)',
          'Participate in national Capture The Flag (CTF) security competitions'
        ],
        exams: [
          { name: 'JEE Main', officialUrl: 'https://jeemain.nta.nic.in', verified: true }
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Phishing Email & Header Forensic Inspection', kind: 'trial', duration: '6 mins' },
      { title: 'Try: Solve a basic cryptography cipher puzzle', kind: 'do', duration: '20 mins' }
    ],
    trialActivityId: 'cyber-phishing-audit',
    adjacent: ['software-engineer', 'data-scientist', 'corporate-lawyer'],
    sources: [
      { title: 'CERT-In National Cyber Security Framework', url: 'https://www.cert-in.org.in', publisher: 'Ministry of Electronics and Information Technology' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Requires continuous 24/7 on-call readiness during major security incidents or zero-day vulnerability outbreaks'
    ]
  },
  {
    id: 'digital-marketer',
    name: 'Brand Strategist & Growth Marketer',
    cluster: 'media-communication',
    clusterName: 'Media & Communication',
    summary: 'Creates brand campaigns, manages viral social media content, optimizes search ads, and analyzes digital customer conversion funnels.',
    dayInLife: [
      'Analyze Google Analytics, Meta ad spends, and conversion rates across creative campaigns',
      'Brainstorm visual content ideas, reels, and video ad hooks with copywriters and videographers',
      'Optimize digital search visibility (SEO) and conduct audience A/B split experiments'
    ],
    riasec: { E: 1.0, A: 0.6, C: 0.3 },
    subjects: ['business-studies', 'economics', 'languages-literature'],
    skills: ['creativity', 'communication', 'data-analysis', 'writing'],
    developableSkills: ['creativity', 'data-analysis', 'communication'],
    environments: ['office', 'flexible-remote'],
    salaryRange: {
      currency: 'INR',
      entry: '₹4.5 – ₹8.5 LPA',
      mid: '₹16 – ₹35 LPA',
      note: 'D2C brand heads and growth marketing directors in fast-scaling startups command high equity and bonuses.'
    },
    pathways: [
      {
        title: 'BBA / B.A. Mass Communication Route',
        streamRequired: 'Any stream in Class 11–12',
        steps: [
          'Appear for CUET-UG or IPMAT for BBA / B.Com / B.A. Journalism and Mass Communication',
          'Run live social media or marketing campaigns for school/college clubs',
          'Earn Google Analytics and Meta Certified Digital Marketing Associate badges',
          'Join digital creative agencies or fast-growing consumer brand teams'
        ],
        exams: [
          { name: 'CUET-UG', officialUrl: 'https://cuetug.ntaonline.in', verified: true }
        ]
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: ₹50,000 Ad Budget Split Experiment', kind: 'trial', duration: '5 mins' },
      { title: 'Write: 3 different Instagram reel hooks for a student notebook brand', kind: 'do', duration: '15 mins' }
    ],
    trialActivityId: 'marketing-ad-budget',
    adjacent: ['ux-designer', 'investment-banker', 'product-manager'],
    sources: [
      { title: 'Indian Institute of Mass Communication Academic Catalog', url: 'https://iimc.nic.in', publisher: 'IIMC New Delhi' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Digital ad algorithms (Google, Meta, YouTube) shift constantly, demanding rapid reinvention of creative strategy'
    ]
  },
  {
    id: 'civil-servant',
    name: 'Civil Servant (IAS, IPS, IFS)',
    cluster: 'law-public-service',
    clusterName: 'Law & Public Service',
    summary: 'Administers district public policy, enforces law and order, and represents the Government of India in developmental and diplomatic missions.',
    dayInLife: [
      'Supervise execution of welfare schemes, healthcare clinics, and school education in an administrative district',
      'Address public grievances and coordinate disaster management response during emergencies',
      'Prepare policy briefs and legislative drafts for Ministry departments'
    ],
    riasec: { S: 1.0, E: 0.6, C: 0.3 },
    subjects: ['history-social-science', 'languages-literature', 'economics'],
    skills: ['leadership', 'communication', 'problem-solving', 'writing'],
    developableSkills: ['leadership', 'public-speaking', 'writing'],
    environments: ['office', 'people-facing', 'outdoors-field'],
    salaryRange: {
      currency: 'INR',
      entry: '₹7.5 – ₹11 LPA + Official Housing & Security',
      mid: '₹18 – ₹30 LPA + Allowances',
      note: 'Compensation adheres to 7th Central Pay Commission scales with extensive state executive benefits.'
    },
    pathways: [
      {
        title: 'UPSC Civil Services Examination Route',
        streamRequired: 'Any stream in Class 11–12',
        steps: [
          'Complete Class 12 in any stream (Humanities, Science, or Commerce)',
          'Complete any recognized graduation degree (B.A., B.Sc, B.Com, B.Tech, MBBS, etc.)',
          'Reach minimum age of 21 years',
          'Appear for UPSC Civil Services Examination: Prelims (Objective), Mains (9 Descriptive Papers), and Personality Test (Interview)',
          'Undergo foundation officer training at LBSNAA Mussoorie'
        ],
        exams: [
          { name: 'UPSC Civil Services Examination', officialUrl: 'https://www.upsc.gov.in', verified: true, frequency: 'Annual (May - Prelims)' }
        ],
        note: 'Any recognized graduate degree qualifies; there is no restriction on college major.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: District Drought Relief Resource Allocation', kind: 'trial', duration: '6 mins' },
      { title: 'Read: Preamble and Fundamental Rights in the Indian Constitution', kind: 'read', duration: '15 mins' }
    ],
    trialActivityId: 'civil-drought-allocation',
    adjacent: ['corporate-lawyer', 'clinical-psychologist', 'environmental-scientist'],
    sources: [
      { title: 'UPSC Civil Services Examination Rules and Notice', url: 'https://www.upsc.gov.in', publisher: 'Union Public Service Commission' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'UPSC CSE is among the most competitive exams globally, with over 10 lakh applicants for approximately 1,000 officer allocations (selection rate < 0.1%)'
    ]
  },
  {
    id: 'architect',
    name: 'Sustainable Architect & Urban Planner',
    cluster: 'engineering-making',
    clusterName: 'Engineering & Making',
    summary: 'Designs eco-friendly residential buildings, sustainable public spaces, and urban transit layouts that balance aesthetics and structural engineering.',
    dayInLife: [
      'Draft 3D building models and structural floor plans using AutoCAD and Revit',
      'Conduct site inspections to check foundation safety, material specs, and solar orientation',
      'Consult with structural civil engineers, local municipal planners, and project clients'
    ],
    riasec: { A: 1.0, R: 0.6, I: 0.3 },
    subjects: ['art-design', 'mathematics', 'physics'],
    skills: ['design-thinking', 'creativity', 'problem-solving', 'logical-reasoning'],
    developableSkills: ['design-thinking', 'creativity', 'communication'],
    environments: ['studio', 'outdoors-field', 'office'],
    salaryRange: {
      currency: 'INR',
      entry: '₹4.5 – ₹8 LPA',
      mid: '₹15 – ₹35 LPA',
      note: 'Leading independent architectural practices and international infrastructure consultants offer senior scale.'
    },
    pathways: [
      {
        title: '5-Year Bachelor of Architecture (B.Arch) Route',
        streamRequired: 'Science (PCM) in Class 11–12 (Mandatory Physics, Chemistry, Math)',
        steps: [
          'Complete Class 12 with Physics, Chemistry, and Mathematics (minimum 50%)',
          'Appear for NATA (National Aptitude Test in Architecture) or JEE Main Paper 2 (B.Arch/B.Planning)',
          'Pursue 5-year B.Arch at SPA (School of Planning and Architecture New Delhi/Bhopal/Vijayawada), CEPT Ahmedabad, or IITs',
          'Register with Council of Architecture (CoA) India to legally practice and sign building blueprints'
        ],
        exams: [
          { name: 'NATA (Council of Architecture)', officialUrl: 'https://www.nata.in', verified: true, frequency: 'Multiple sessions' },
          { name: 'JEE Main Paper 2 (B.Arch)', officialUrl: 'https://jeemain.nta.nic.in', verified: true }
        ],
        note: 'Council of Architecture mandates a 5-year professional B.Arch curriculum.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Solar Orientation & Room Layout Planner', kind: 'trial', duration: '6 mins' },
      { title: 'Sketch: Design a modular eco-friendly school classroom on grid paper', kind: 'do', duration: '25 mins' }
    ],
    trialActivityId: 'arch-solar-layout',
    adjacent: ['ux-designer', 'aerospace-engineer', 'environmental-scientist'],
    sources: [
      { title: 'Council of Architecture Minimum Standards of Architectural Education', url: 'https://www.coa.gov.in', publisher: 'Council of Architecture India' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Early junior architects typically start on modest stipends while completing mandatory apprenticeships'
    ]
  },
  {
    id: 'sports-physiotherapist',
    name: 'Sports Physiotherapist & Rehab Specialist',
    cluster: 'health-life-sciences',
    clusterName: 'Health & Life Sciences',
    summary: 'Rehabilitates musculoskeletal athletic injuries, assesses body biomechanics, and designs injury prevention routines for sports teams.',
    dayInLife: [
      'Evaluate athlete joint mobility, muscle strain, and post-surgery ligament recovery',
      'Administer targeted manual therapy, therapeutic ultrasound, and biomechanical exercise drills',
      'Collaborate with sports conditioning coaches to clear players for match competition'
    ],
    riasec: { S: 1.0, R: 0.6, I: 0.3 },
    subjects: ['biology', 'physics'],
    skills: ['lab-skills', 'communication', 'problem-solving', 'teamwork'],
    developableSkills: ['communication', 'problem-solving', 'teamwork'],
    environments: ['people-facing', 'outdoors-field'],
    salaryRange: {
      currency: 'INR',
      entry: '₹4 – ₹7.5 LPA',
      mid: '₹14 – ₹30 LPA',
      note: 'Positions with national sports federations, IPL cricket franchises, or ISL clubs offer attractive retainers.'
    },
    pathways: [
      {
        title: 'Bachelor of Physiotherapy (BPT) Route',
        streamRequired: 'Science (PCB) in Class 11–12',
        steps: [
          'Complete Class 12 with Physics, Chemistry, and Biology (minimum 50%)',
          'Appear for NEET-UG or State CET Physiotherapy entrance examinations',
          'Complete 4.5-year BPT (Bachelor of Physiotherapy) including 6 months of rotational clinical hospital internship',
          'Pursue 2-year MPT in Sports Physiotherapy'
        ],
        exams: [
          { name: 'NEET-UG / State Health University CETs', officialUrl: 'https://neet.nta.nic.in', verified: true }
        ],
        note: '4.5 years full-time undergraduate duration including mandatory hospital rotations.'
      }
    ],
    beginnerActivities: [
      { title: 'Interactive Challenge: Sprained Ankle Rehabilitation Triage', kind: 'trial', duration: '5 mins' },
      { title: 'Learn: How human joints and ligaments handle athletic impact', kind: 'watch', duration: '12 mins' }
    ],
    trialActivityId: 'physio-ankle-triage',
    adjacent: ['clinical-psychologist', 'biomedical-researcher', 'environmental-scientist'],
    sources: [
      { title: 'National Commission for Allied and Healthcare Professions Act', url: 'https://main.mohfw.gov.in', publisher: 'Ministry of Health and Family Welfare, GoI' }
    ],
    lastVerified: '2026-10-24',
    verification: 'verified',
    uncertainties: [
      'Elite sports franchise positions are scarce and require years of hospital and domestic club credentials'
    ]
  }
];
