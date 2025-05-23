const mongoose = require("mongoose");
const {seedTipsIfEmpty}= require('../utils/seedTips'); // ← Add this

let encodedPassword = encodeURIComponent(process.env.MONGO_URI);



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    await seedTipsIfEmpty(); // ← Call here!

  } catch (error) {
    console.error('Error connecting:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
