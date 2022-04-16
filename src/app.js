import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

import scheduleRouter from './routes/ScheduleRouter.js';

// middlewares
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

app.use(express.json());
// http log system
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Schedule vaccination appointment' });
});

// Route
app.use('/api', scheduleRouter);

app.use(errorMiddleware);

export default app;
