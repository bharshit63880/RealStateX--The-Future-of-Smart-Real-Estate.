import { Router } from 'express';

import { healthCheck, readinessCheck } from './health.controller.js';

const router = Router();

router.get('/health', healthCheck);
router.get('/health/live', healthCheck);
router.get('/health/ready', readinessCheck);

export default router;
