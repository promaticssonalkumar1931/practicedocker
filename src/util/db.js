const mongoose = require('mongoose');

async function connectionDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log('MONGO_URI is missing in .env. Please add your MongoDB connection string.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully...');
  } catch (err) {
    console.log('While connecting to the database, getting this error:');
    console.log(err && err.message ? err.message : err);
  }
}

module.exports = connectionDB;


