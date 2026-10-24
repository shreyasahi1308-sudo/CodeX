import { Request, Response } from 'express';
import { careerRepo, sessionRepo } from '../db/index.js';
import { recommendCareers } from '../engine/recommender.js';
import { questionnaireItems, availableSubjects, availableGrowthSkills, availableEnvironments } from '../data/questions.js';
import { AssessmentAnswers } from '../types/index.js';

export const assessmentController = {
  getQuestionnaire(req: Request, res: Response) {
    res.json({
      success: true,
      data: {
        questions: questionnaireItems,
        subjects: availableSubjects,
        growthSkills: availableGrowthSkills,
        environments: availableEnvironments,
      },
    });
  },

  submit(req: Request, res: Response) {
    try {
      const answers: AssessmentAnswers = req.body;

      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ success: false, error: 'Valid assessment answers payload required' });
      }

      const careers = careerRepo.getAll();
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      const recommendations = recommendCareers(answers, careers, { sessionId });

      // Save to SQLite
      sessionRepo.save(sessionId, answers, recommendations);

      res.json({
        success: true,
        data: recommendations,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to process assessment', details: err.message });
    }
  },

  getBySessionId(req: Request, res: Response) {
    try {
      const sessionId = String(req.params.sessionId);
      const session = sessionRepo.getById(sessionId);

      if (!session) {
        return res.status(404).json({ success: false, error: `Assessment session "${sessionId}" not found` });
      }

      res.json({
        success: true,
        data: session,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve assessment session', details: err.message });
    }
  },
};
