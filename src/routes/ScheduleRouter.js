import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController.js';

const router = Router();

const scheduleController = new ScheduleController();

router.get('/schedules', scheduleController.index.bind(scheduleController));
router.get('/schedules/:id', scheduleController.getOne.bind(scheduleController));
router.post('/schedules', scheduleController.store.bind(scheduleController));
router.put('/schedules/:id', scheduleController.update.bind(scheduleController));
router.delete('/schedules/:id', scheduleController.delete.bind(scheduleController));

export default router;
