import { Request, Response } from 'express';
import { activityRepo, reflectionRepo } from '../db/index.js';
import { evaluateActivityReflection } from '../services/gemma.service.js';

export const activityController = {
  getAll(req: Request, res: Response) {
    try {
      const activities = activityRepo.getAll();
      res.json({ success: true, count: activities.length, data: activities });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve activities', details: err.message });
    }
  },

  getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const activity = activityRepo.getById(id);

      if (!activity) {
        return res.status(404).json({ success: false, error: `Activity with ID "${id}" not found` });
      }

      res.json({ success: true, data: activity });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to retrieve activity', details: err.message });
    }
  },

  async submitReflection(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { sessionId, userAction, reflectionAnswers } = req.body;

      const activity = activityRepo.getById(id);
      if (!activity) {
        return res.status(404).json({ success: false, error: `Activity with ID "${id}" not found` });
      }

      // Compute dimension shift based on reflection options
      const dimensionShift: Record<string, number> = {};
      if (reflectionAnswers && typeof reflectionAnswers === 'object') {
        for (const q of activity.reflectionQuestions) {
          const selectedVal = reflectionAnswers[q.id];
          const opt = q.options.find(o => o.value === selectedVal);
          if (opt?.primaryDimensionShift) {
            const { dim, shift } = opt.primaryDimensionShift;
            dimensionShift[dim] = (dimensionShift[dim] || 0) + shift;
          }
        }
      }

      // Evaluate with Gemma or deterministic coaching
      const evaluation = await evaluateActivityReflection(
        activity,
        userAction || {},
        reflectionAnswers || {}
      );

      // Persist reflection
      const safeSessionId = sessionId || `anon_${Date.now()}`;
      reflectionRepo.save(
        safeSessionId,
        id,
        userAction || {},
        reflectionAnswers || {},
        evaluation.data,
        dimensionShift
      );

      res.json({
        success: true,
        data: {
          activityId: id,
          evaluation: evaluation.data,
          dimensionShift,
          meta: evaluation.meta,
          note: 'Experience-informed shift: this represents an exploratory nudge, not a psychometric diagnosis.',
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: 'Failed to evaluate reflection', details: err.message });
    }
  },
};
