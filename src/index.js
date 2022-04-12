import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import scheduleRouter from './routes/ScheduleRouter.js';

// middlewares
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 4000;

const app = express();

// Connecting to the database
try {
  await mongoose.connect(DATABASE_URL);
  console.log('MongoDB is connected');
} catch (error) {
  console.error(error);
}

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

app.listen(PORT, () => {
  console.log(`API started at port ${PORT}`);
});
