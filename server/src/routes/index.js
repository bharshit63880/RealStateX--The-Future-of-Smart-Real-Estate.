import { Router } from 'express';

import healthRoutes from '../modules/health/health.routes.js';
import propertyRoutes from '../modules/properties/property.routes.js';

const router = Router();

router.use(healthRoutes);
router.use('/properties', propertyRoutes);

export default router;
