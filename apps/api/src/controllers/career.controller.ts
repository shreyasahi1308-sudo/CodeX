import { Request, Response } from 'express';
import { careerRepo } from '../db/index.js';
import { explainCareerFit, askCareerMentor } from '../services/gemma.service.js';

export const careerController = {
  getAll(req: Request, res: Response) {
    try {
      const { cluster, q } = req.query;
      let careers = careerRepo.getAll();

      if (cluster && typeof cluster === 'string') {
        careers = careers.filter(c => c.cluster === cluster);
      }

      if (q && typeof q === 'string') {
        const queryLower = q.toLowerCase();
        careers = careers.filter(
          c =>
            c.name.toLowerCase().includes(queryLower) ||
            c.summary.toLowerCase().includes(queryLower) ||
            c.clusterName.toLowerCase().includes(queryLower) ||
            c.subjects.some(s => s.toLowerCase().includes(queryLower)) ||
            c.skills.some(s => s.toLowerCase().includes(queryLower))
        );
      }

      res.json({ success: true, count: careers.length, data: careers });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve careers', details: err.message });
    }
  },

  getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const career = careerRepo.getById(id);

      if (!career) {
        return res.status(404).json({ success: false, error: `Career with ID "${id}" not found` });
      }

      res.json({ success: true, data: career });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve career', details: err.message });
    }
  },

  async explainFit(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { answers, scorePercent } = req.body;

      const career = careerRepo.getById(id);
      if (!career) {
        return res.status(404).json({ success: false, error: `Career with ID "${id}" not found` });
      }

      const safeAnswers = answers || {
        activityRatings: {},
        subjects: [],
        growthSkills: [],
        environments: [],
        openness: 3,
      };

      const explanation = await explainCareerFit(career, safeAnswers, scorePercent || 75);
      res.json({ success: true, ...explanation });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to generate explanation', details: err.message });
    }
  },

  async askMentor(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { question, history } = req.body;

      if (!question || typeof question !== 'string') {
        return res.status(400).json({ success: false, error: 'A question string is required' });
      }

      const career = careerRepo.getById(id);
      if (!career) {
        return res.status(404).json({ success: false, error: `Career with ID "${id}" not found` });
      }

      const response = await askCareerMentor(career, question, history || []);
      res.json({ success: true, ...response });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to get mentor response', details: err.message });
    }
  },

  compare(req: Request, res: Response) {
    try {
      const { careerIds } = req.body;
      if (!Array.isArray(careerIds) || careerIds.length < 2) {
        return res.status(400).json({ success: false, error: 'Please supply at least 2 career IDs to compare' });
      }

      const careers = careerIds
        .map(id => careerRepo.getById(id))
        .filter((c): c is NonNullable<typeof c> => c !== null);

      if (careers.length < 2) {
        return res.status(404).json({ success: false, error: 'At least 2 valid careers must be found' });
      }

      const comparisonMatrix = {
        careers: careers.map(c => ({
          id: c.id,
          name: c.name,
          clusterName: c.clusterName,
          summary: c.summary,
          streamRequired: c.pathways[0]?.streamRequired || 'Any Stream',
          primaryExam: c.pathways[0]?.exams?.[0]?.name || 'Direct / Merit',
          duration: c.pathways[0]?.steps[2] || '3-4 Year Undergrad',
          salaryEntry: c.salaryRange.entry,
          salaryMid: c.salaryRange.mid,
          workEnvironment: c.environments.join(', '),
          dayInLife: c.dayInLife[0],
          uncertainty: c.uncertainties[0],
        })),
      };

      res.json({ success: true, data: comparisonMatrix });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to compare careers', details: err.message });
    }
  },
};
