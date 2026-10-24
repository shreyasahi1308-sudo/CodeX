import { TryActivity } from '../types/index.js';

export const activitiesData: TryActivity[] = [
  {
    id: 'ux-screen-fixer',
    careerId: 'ux-designer',
    title: 'Fix the Confusing Bus-Pass App Screen',
    area: 'UX & Product Design',
    durationMinutes: 6,
    scenario: 'Students are arriving late to school because the digital monthly bus-pass app has 3 major usability flaws. Passengers fumble at the bus scanner because key details are hidden or cluttered.',
    instructions: 'Identify the 3 usability flaws on the mock ticket screen, then tap the rearrangement buttons to order the screen elements logically for rapid bus boarding.',
    type: 'screen_fixer',
    interactiveData: {
      screenMock: {
        title: 'City Transit Digital Pass v1.0',
        elements: [
          { id: 'el-qr', name: 'Scannable QR Boarding Code', currentPos: 4, idealPos: 1, flaw: 'Hidden at the very bottom below the fold' },
          { id: 'el-expiry', name: 'Pass Validity Date & Active Status', currentPos: 3, idealPos: 2, flaw: 'Tiny gray text on gray background' },
          { id: 'el-route', name: 'Student Name & Route: Route 42B', currentPos: 2, idealPos: 3, flaw: 'Giant font wasting 40% of the upper screen' },
          { id: 'el-legal', name: '12 Lines of Transit Legal Terms & Conditions', currentPos: 1, idealPos: 4, flaw: 'Occupies prime top area where the QR code should be' }
        ],
        identifiedFlawsRequired: 3,
        optionsFlaws: [
          { id: 'flaw-1', text: 'Important QR code is shoved at the bottom under the fold', correct: true },
          { id: 'flaw-2', text: 'Legal terms take up prime space instead of passenger boarding pass', correct: true },
          { id: 'flaw-3', text: 'App background color is too dark for OLED screens', correct: false },
          { id: 'flaw-4', text: 'Validity date text has low contrast making it hard to verify outdoors', correct: true },
          { id: 'flaw-5', text: 'The bus driver name is not shown in 3D animation', correct: false }
        ]
      }
    },
    reflectionQuestions: [
      {
        id: 'ref-1',
        prompt: 'Which part of this design exercise felt most engaging to you?',
        options: [
          { value: 'problem_spotting', label: 'Spotting why everyday interfaces annoy real humans', primaryDimensionShift: { dim: 'I', shift: 0.1 } },
          { value: 'rearranging', label: 'Rearranging elements to make information clear and beautiful', primaryDimensionShift: { dim: 'A', shift: 0.1 } },
          { value: 'empathizing', label: 'Imagining how rushed students feel standing in front of a bus scanner', primaryDimensionShift: { dim: 'S', shift: 0.1 } }
        ]
      },
      {
        id: 'ref-2',
        prompt: 'When someone criticizes an interface you created, how would you prefer to respond?',
        options: [
          { value: 'test_users', label: 'Run a test with 5 people to see what data says about the issue' },
          { value: 'iterate_options', label: 'Sketch 3 alternative layouts right away' },
          { value: 'explain_logic', label: 'Walk them through the design rationale step-by-step' }
        ]
      }
    ]
  },
  {
    id: 'data-canteen-detective',
    careerId: 'data-scientist',
    title: 'School Canteen Data Detective',
    area: 'Data Science & Analytics',
    durationMinutes: 5,
    scenario: 'The school canteen manager claims: "We are losing money because nobody buys fruit bowls, so we should replace them entirely with samosas." You are handed 14 days of sales logs.',
    instructions: 'Toggle between the sales charts and daily temperature records to uncover the hidden trend. Does the data actually support the manager’s claim?',
    type: 'canteen_detective',
    interactiveData: {
      records: [
        { day: 'Mon 1', tempC: 38, fruitBowlsSold: 48, samosasSold: 20, revenue: 3800 },
        { day: 'Tue 1', tempC: 39, fruitBowlsSold: 52, samosasSold: 18, revenue: 4100 },
        { day: 'Wed 1', tempC: 24, fruitBowlsSold: 12, samosasSold: 65, revenue: 3900 },
        { day: 'Thu 1', tempC: 22, fruitBowlsSold: 10, samosasSold: 70, revenue: 4200 },
        { day: 'Fri 1', tempC: 36, fruitBowlsSold: 45, samosasSold: 22, revenue: 3750 },
        { day: 'Mon 2', tempC: 37, fruitBowlsSold: 50, samosasSold: 19, revenue: 4000 },
        { day: 'Tue 2', tempC: 23, fruitBowlsSold: 9, samosasSold: 68, revenue: 3950 }
      ],
      hypotheses: [
        {
          id: 'hyp-1',
          text: 'Manager is correct: Fruit bowls always sell poorly across all school days.',
          correct: false,
          feedback: 'Look closely at hot days (temp > 35°C)! On hot days, fruit bowl sales jump to 50+ units while samosas drop.'
        },
        {
          id: 'hyp-2',
          text: 'Seasonality/Weather Driver: Fruit bowl demand strongly correlates with high temperatures (>35°C), whereas samosa sales spike when it rains/cools (<25°C).',
          correct: true,
          feedback: 'Spot on! You uncovered the confounding variable (temperature). Removing fruit bowls would cause massive lost sales in summer months!'
        },
        {
          id: 'hyp-3',
          text: 'Day of week driver: Students only eat healthy food on Mondays.',
          correct: false,
          feedback: 'Monday 2 was hot (37°C) and sold 50 bowls, but Wednesday 1 (24°C) sold only 12. Temperature, not day-of-week, drives demand.'
        }
      ]
    },
    reflectionQuestions: [
      {
        id: 'ref-canteen-1',
        prompt: 'Did investigating patterns in the sales table feel interesting or tedious?',
        options: [
          { value: 'thrilling', label: 'Exciting — like solving a mystery with clues hidden in numbers', primaryDimensionShift: { dim: 'I', shift: 0.1 } },
          { value: 'practical', label: 'Satisfying because it prevents a bad real-world business decision', primaryDimensionShift: { dim: 'C', shift: 0.1 } },
          { value: 'neutral', label: 'Okay, but I would rather build the visual dashboard than hunt numbers' }
        ]
      }
    ]
  },
  {
    id: 'bio-plant-lab',
    careerId: 'biomedical-researcher',
    title: 'Plant Genetics & Drought Resistance Assay',
    area: 'Biomedical & Life Sciences',
    durationMinutes: 7,
    scenario: 'Your biology lab is testing a CRISPR-modified wheat strain (Strain X-7) intended to survive severe Indian agricultural droughts with 50% less water.',
    instructions: 'Select your control group, manipulate the soil moisture level, observe the cell chlorophyll retention chart, and formulate your scientific finding.',
    type: 'plant_lab',
    interactiveData: {
      strains: [
        { id: 'wild_type', name: 'Wild Type (Standard Wheat)', baselineYield: 100, droughtSurvivalRate: 28 },
        { id: 'strain_x7', name: 'Genetically Modified Strain X-7', baselineYield: 98, droughtSurvivalRate: 74 },
        { id: 'control_blank', name: 'Negative Control (Non-irrigated Wild)', baselineYield: 20, droughtSurvivalRate: 15 }
      ],
      conclusions: [
        {
          id: 'concl-1',
          text: 'Strain X-7 demonstrates a 2.6x improvement in drought survival over Wild Type while maintaining 98% baseline yield.',
          correct: true,
          feedback: 'Precise scientific analysis! You correctly compared the survival ratio and checked for unintended yield penalty.'
        },
        {
          id: 'concl-2',
          text: 'Strain X-7 completely failed because baseline yield is 2% lower.',
          correct: false,
          feedback: 'A 2% variance is within normal experimental error, whereas the 74% vs 28% drought survival is a transformative leap!'
        }
      ]
    },
    reflectionQuestions: [
      {
        id: 'ref-bio-1',
        prompt: 'Which aspect of laboratory science excites your curiosity the most?',
        options: [
          { value: 'hypothesis', label: 'Formulating hypotheses and testing if nature behaves as predicted', primaryDimensionShift: { dim: 'I', shift: 0.1 } },
          { value: 'hands_on', label: 'Working hands-on with lab apparatus, pipettes, and specimens', primaryDimensionShift: { dim: 'R', shift: 0.1 } },
          { value: 'impact', label: 'Knowing that the breakthrough could feed millions of farmers during climate crises', primaryDimensionShift: { dim: 'S', shift: 0.1 } }
        ]
      }
    ]
  },
  {
    id: 'finance-stall-allocator',
    careerId: 'investment-banker',
    title: 'Run the School Fest Stall: Budget Allocation',
    area: 'Finance & Entrepreneurship',
    durationMinutes: 6,
    scenario: 'Your class has received a seed grant of ₹5,000 to operate a stall at the inter-school annual festival. You must allocate this capital across 4 categories to maximize profit while managing risk.',
    instructions: 'Adjust the sliders to distribute ₹5,000 across Raw Inventory, Marketing/Promotions, Stall Décor/Ambiance, and Contingency Reserve. Then run the festival simulation!',
    type: 'fest_stall',
    interactiveData: {
      totalBudget: 5000,
      categories: [
        { id: 'inventory', name: 'High-Demand Snack Inventory', min: 1000, max: 4000, default: 2500, returnMultiplier: 1.8 },
        { id: 'marketing', name: 'Instagram & Campus Posters', min: 200, max: 1500, default: 800, returnMultiplier: 1.4 },
        { id: 'decor', name: 'Lighting, Music & Photo Booth', min: 200, max: 1200, default: 1000, returnMultiplier: 1.2 },
        { id: 'reserve', name: 'Emergency Contingency Reserve', min: 200, max: 1500, default: 700, returnMultiplier: 1.0 }
      ]
    },
    reflectionQuestions: [
      {
        id: 'ref-finance-1',
        prompt: 'How did balancing financial risk and returns feel during this exercise?',
        options: [
          { value: 'energizing', label: 'Energizing — I loved calculating profit margins and trade-offs', primaryDimensionShift: { dim: 'E', shift: 0.1 } },
          { value: 'caution', label: 'I focused on safety and having enough reserve in case things went wrong', primaryDimensionShift: { dim: 'C', shift: 0.1 } },
          { value: 'creativity', label: 'I wanted to spend the most on décor and brand experience to delight people', primaryDimensionShift: { dim: 'A', shift: 0.1 } }
        ]
      }
    ]
  },
  {
    id: 'law-contract-audit',
    careerId: 'corporate-lawyer',
    title: 'Corporate Contract Risk Audit',
    area: 'Corporate Law & Governance',
    durationMinutes: 6,
    scenario: 'A promising student-founded EdTech startup is about to sign a commercial cloud hosting agreement with an overseas vendor. The founder asked you to check Clause 14 for hidden legal risks.',
    instructions: 'Read the sample contract clause. Click on the sentence containing the unfair unlimited liability trap, then choose the balanced amendment.',
    type: 'legal_audit',
    interactiveData: {
      clauseTitle: 'Clause 14: Indemnification and Limitation of Liability',
      clauseText: 'The Customer agrees to indemnify and hold harmless CloudHost Corp against any and all claims, damages, and legal costs arising from any disruption. CloudHost Corp’s total aggregate liability for any data loss, service outage, or negligence shall in no event exceed ₹1,000 (One Thousand Indian Rupees), even if Customer incurs catastrophic business loss.',
      riskPhrase: 'CloudHost Corp’s total aggregate liability for any data loss, service outage, or negligence shall in no event exceed ₹1,000 (One Thousand Indian Rupees)',
      solutionOptions: [
        {
          id: 'sol-1',
          text: 'Accept the clause as written because cloud companies never change their terms.',
          correct: false,
          feedback: 'Dangerous! If the server wipes all student database records, the startup receives only ₹1,000 compensation!'
        },
        {
          id: 'sol-2',
          text: 'Negotiate mutual liability capped at the total fees paid by the Customer in the preceding 12 months, with an exception for gross negligence.',
          correct: true,
          feedback: 'Excellent corporate legal insight! Capping liability at "12 months of paid fees" is the global fair market standard.'
        }
      ]
    },
    reflectionQuestions: [
      {
        id: 'ref-law-1',
        prompt: 'Did dissecting wordings and spotting hidden liabilities feel rewarding?',
        options: [
          { value: 'protective', label: 'Yes — it felt great to protect a vulnerable party from an unfair trap', primaryDimensionShift: { dim: 'S', shift: 0.1 } },
          { value: 'analytical', label: 'I loved analyzing the precision of each legal word and sentence structure', primaryDimensionShift: { dim: 'I', shift: 0.1 } },
          { value: 'negotiation', label: 'I enjoyed thinking about how to negotiate and persuade the counterparty', primaryDimensionShift: { dim: 'E', shift: 0.1 } }
        ]
      }
    ]
  }
];
