import { Router } from 'express';

const router = Router();

router.get('/schedules', (req, res) => {
  res.json('Working...');
});
router.get('/schedules/:id', (req, res) => { res.json('Working...'); });
router.post('/schedules', (req, res) => { res.json('Working...'); });
router.put('/schedules/:id', (req, res) => { res.json('Working...'); });
router.delete('/schedules/:id', (req, res) => { res.json('Working...'); });

export default router;
