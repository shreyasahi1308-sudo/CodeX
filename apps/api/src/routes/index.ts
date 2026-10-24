import { Router } from 'express';
import { careerController } from '../controllers/career.controller.js';
import { assessmentController } from '../controllers/assessment.controller.js';
import { activityController } from '../controllers/activity.controller.js';
import { savedController } from '../controllers/saved.controller.js';
import { config } from '../config/index.js';
import { getDatabase } from '../db/index.js';

const router = Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('SELECT 1 as healthy').get() as { healthy: number };

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: result?.healthy === 1 ? 'connected' : 'unhealthy',
      aiProvider: {
        model: 'google/gemma-4-31B-it:novita',
        router: 'https://router.huggingface.co/v1',
        tokenConfigured: Boolean(config.hfToken),
        mode: config.hfToken ? 'live_with_fallback' : 'deterministic_only',
      },
    });
  } catch (err: any) {
    res.status(503).json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
      error: err.message,
    });
  }
});

// Questionnaire Routes
router.get('/questions', assessmentController.getQuestionnaire);
router.post('/assessments', assessmentController.submit);
router.get('/assessments/:sessionId', assessmentController.getBySessionId);

// Career Routes
router.get('/careers', careerController.getAll);
router.get('/careers/:id', careerController.getById);
router.post('/careers/:id/explain', careerController.explainFit);
router.post('/careers/:id/ask', careerController.askMentor);
router.post('/compare', careerController.compare);

// Interactive Activities Routes
router.get('/activities', activityController.getAll);
router.get('/activities/:id', activityController.getById);
router.post('/activities/:id/submit', activityController.submitReflection);

// Saved Careers Routes
router.get('/saved/:sessionId', savedController.getBySession);
router.post('/saved', savedController.save);
router.delete('/saved/:sessionId/:careerId', savedController.remove);

export default router;
