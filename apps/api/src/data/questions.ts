import { QuestionItem, SubjectId, SkillId, EnvId } from '../types/index.js';

export const questionnaireItems: QuestionItem[] = [
  // Realistic (Practical / Hands-on)
  {
    id: 'r1',
    dimension: 'R',
    prompt: 'Build, repair, or set up physical machinery, electronics, or tools with your hands'
  },
  {
    id: 'r2',
    dimension: 'R',
    prompt: 'Grow plants, care for animals, or work outdoors on an environmental field project'
  },
  {
    id: 'r3',
    dimension: 'R',
    prompt: 'Take a gadget, motor, or appliance apart to see how its mechanical components function'
  },

  // Investigative (Analytical / Scientific / Research)
  {
    id: 'i1',
    dimension: 'I',
    prompt: 'Design a scientific experiment and work out the physics or chemistry behind unexpected results'
  },
  {
    id: 'i2',
    dimension: 'I',
    prompt: 'Examine charts, data patterns, and numbers to figure out what they reveal'
  },
  {
    id: 'i3',
    dimension: 'I',
    prompt: 'Research a difficult unsolved problem or question until you discover a solid, evidence-backed answer'
  },

  // Artistic (Creative / Conceptual / Expressive)
  {
    id: 'a1',
    dimension: 'A',
    prompt: 'Design an app screen layout, a visual poster, or a 3D video game character'
  },
  {
    id: 'a2',
    dimension: 'A',
    prompt: 'Write an imaginative story, a screenplay script, or original music'
  },
  {
    id: 'a3',
    dimension: 'A',
    prompt: 'Shoot and edit a short video or visual photo series that conveys a powerful message'
  },

  // Social (Helping / Teaching / Counseling)
  {
    id: 's1',
    dimension: 'S',
    prompt: 'Explain a difficult concept patiently until a friend or classmate finally grasps it'
  },
  {
    id: 's2',
    dimension: 'S',
    prompt: 'Support someone through an emotionally challenging, stressful, or anxious situation'
  },
  {
    id: 's3',
    dimension: 'S',
    prompt: 'Plan and conduct a workshop, mentoring session, or activity for younger students'
  },

  // Enterprising (Leading / Persuading / Entrepreneurship)
  {
    id: 'e1',
    dimension: 'E',
    prompt: 'Convince and inspire others to back a student campaign, project, or social cause'
  },
  {
    id: 'e2',
    dimension: 'E',
    prompt: 'Plan, budget, and launch a small stall, school initiative, or club fundraiser'
  },
  {
    id: 'e3',
    dimension: 'E',
    prompt: 'Step up as a team captain or group leader to guide everyone toward a collective goal'
  },

  // Conventional (Organizing / Systems / Detail)
  {
    id: 'c1',
    dimension: 'C',
    prompt: 'Organize files, database records, and research notes so they are crystal clear and easy to retrieve'
  },
  {
    id: 'c2',
    dimension: 'C',
    prompt: 'Audit financial numbers, budget spreadsheets, or code records to catch hidden errors'
  },
  {
    id: 'c3',
    dimension: 'C',
    prompt: 'Plan a structured study timetable or logistics checklist to ensure an event runs without hiccups'
  }
];

export const availableSubjects: { id: SubjectId; label: string; stream: string }[] = [
  { id: 'mathematics', label: 'Mathematics', stream: 'Science / Commerce' },
  { id: 'physics', label: 'Physics', stream: 'Science (PCM)' },
  { id: 'chemistry', label: 'Chemistry', stream: 'Science (PCM/PCB)' },
  { id: 'biology', label: 'Biology & Life Sciences', stream: 'Science (PCB)' },
  { id: 'computer-science', label: 'Computer Science & Informatics', stream: 'Science / Tech' },
  { id: 'economics', label: 'Economics', stream: 'Commerce / Humanities' },
  { id: 'accountancy', label: 'Accountancy', stream: 'Commerce' },
  { id: 'business-studies', label: 'Business Studies', stream: 'Commerce' },
  { id: 'history-social-science', label: 'History, Civics & Social Sciences', stream: 'Humanities' },
  { id: 'languages-literature', label: 'English & Literature', stream: 'All Streams' },
  { id: 'art-design', label: 'Fine Arts, Design & Media', stream: 'Design / Creative' },
  { id: 'psychology', label: 'Psychology', stream: 'Humanities / Science' }
];

export const availableGrowthSkills: { id: SkillId; label: string }[] = [
  { id: 'coding', label: 'Computer Programming & Coding' },
  { id: 'data-analysis', label: 'Data Analysis & Spreadsheets' },
  { id: 'lab-skills', label: 'Scientific Lab & Experimental Skills' },
  { id: 'design-thinking', label: 'UI/UX & Design Thinking' },
  { id: 'writing', label: 'Persuasive Writing & Journalism' },
  { id: 'public-speaking', label: 'Public Speaking & Debating' },
  { id: 'communication', label: 'Interpersonal Communication & Empathy' },
  { id: 'leadership', label: 'Team Leadership & Project Management' },
  { id: 'research-methods', label: 'In-Depth Research & Investigation' },
  { id: 'problem-solving', label: 'Complex Problem Solving' },
  { id: 'creativity', label: 'Creative Conception & Visual Arts' },
  { id: 'financial-literacy', label: 'Financial Modeling & Investing' }
];

export const availableEnvironments: { id: EnvId; label: string; icon: string }[] = [
  { id: 'lab', label: 'Science / Tech Laboratory', icon: 'FlaskConical' },
  { id: 'outdoors-field', label: 'Outdoors & On-Site Field Work', icon: 'Compass' },
  { id: 'studio', label: 'Creative Studio & Workshop', icon: 'Palette' },
  { id: 'office', label: 'Corporate Office / Collaborative Hub', icon: 'Building2' },
  { id: 'people-facing', label: 'Direct Public / Client Facing', icon: 'Users' },
  { id: 'flexible-remote', label: 'Flexible / Hybrid Remote', icon: 'Laptop' }
];
