import { Router } from 'express';
import { addAlert, checkAlerts, markAlertNotified } from './controllers/alertController';

const router = Router();

router.post('/alerts', addAlert);
router.get('/alerts', checkAlerts);
router.put('/alerts/:id', markAlertNotified);

export default router;
