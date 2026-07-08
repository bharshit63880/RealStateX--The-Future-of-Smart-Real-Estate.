import { Router } from 'express';

import healthRoutes from '../modules/health/health.routes.js';

const router = Router();

router.use(healthRoutes);

export default router;
