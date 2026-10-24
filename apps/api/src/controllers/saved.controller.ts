import { Request, Response } from 'express';
import { savedCareerRepo, careerRepo } from '../db/index.js';

export const savedController = {
  getBySession(req: Request, res: Response) {
    try {
      const sessionId = String(req.params.sessionId);
      const saved = savedCareerRepo.getBySession(sessionId);
      res.json({ success: true, count: saved.length, data: saved });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve saved careers', details: err.message });
    }
  },

  save(req: Request, res: Response) {
    try {
      const { sessionId, careerId, notes } = req.body;
      if (!sessionId || !careerId) {
        return res.status(400).json({ success: false, error: 'sessionId and careerId are required' });
      }

      const career = careerRepo.getById(careerId);
      if (!career) {
        return res.status(404).json({ success: false, error: `Career "${careerId}" does not exist` });
      }

      savedCareerRepo.save(sessionId, careerId, notes);
      res.json({ success: true, message: 'Career saved successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to save career', details: err.message });
    }
  },

  remove(req: Request, res: Response) {
    try {
      const sessionId = String(req.params.sessionId);
      const careerId = String(req.params.careerId);
      savedCareerRepo.remove(sessionId, careerId);
      res.json({ success: true, message: 'Career removed from saved list' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to remove career', details: err.message });
    }
  },
};
