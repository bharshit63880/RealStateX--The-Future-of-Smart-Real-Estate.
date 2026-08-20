import { Router } from 'express';
import { listProperties, showProperty } from './property.controller.js';
const router = Router();
router.get('/', listProperties);
router.get('/:slug', showProperty);
export default router;
