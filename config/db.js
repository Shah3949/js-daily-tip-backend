const mongoose = require("mongoose");
const {seedTipsIfEmpty}= require('../utils/seedTips'); // ← Add this


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await seedTipsIfEmpty(); // ← Call here!

  } catch (error) {
    console.error('Error connecting:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
