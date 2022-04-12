import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { postSchema, putSchema } from '../validators/scheduleSchema.js';

const router = Router();

const scheduleController = new ScheduleController();

router.get('/schedules', scheduleController.index.bind(scheduleController));
router.post('/schedules', validationMiddleware(postSchema), scheduleController.store.bind(scheduleController));
router.put('/schedules/:id', validationMiddleware(putSchema), scheduleController.update.bind(scheduleController));
router.delete('/schedules/:id', scheduleController.delete.bind(scheduleController));

export default router;
