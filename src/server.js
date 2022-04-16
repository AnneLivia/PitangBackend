import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 4000;

const { DATABASE_URL } = process.env;

// Connecting to the database
try {
  await mongoose.connect(DATABASE_URL);
  console.log('MongoDB is connected');
} catch (error) {
  console.error(error);
}

app.listen(PORT, () => {
  console.log(`API started at port ${PORT}`);
});
