import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.json({ message: 'Schedule vaccination appointment' });
});

app.listen(PORT, () => {
  console.log(`API started at port ${PORT}`);
});
