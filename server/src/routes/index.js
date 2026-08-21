import { Router } from 'express';

import healthRoutes from '../modules/health/health.routes.js';
import propertyRoutes from '../modules/properties/property.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';
import engagementRoutes from '../modules/engagement/engagement.routes.js';
import transactionRoutes from '../modules/transactions/transaction.routes.js';
import operationsRoutes from '../modules/operations/operations.routes.js';
import businessRoutes from '../modules/business/business.routes.js';

const router = Router();

router.use(healthRoutes);
router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use(engagementRoutes);
router.use(transactionRoutes);
router.use(operationsRoutes);
router.use(businessRoutes);

export default router;
