import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController.js';

const router = Router();

const scheduleController = new ScheduleController();

router.get('/schedules', scheduleController.index);
router.get('/schedules/:id', scheduleController.getOne);
router.post('/schedules', scheduleController.store);
router.put('/schedules/:id', scheduleController.update);
router.delete('/schedules/:id', scheduleController.delete);

export default router;
