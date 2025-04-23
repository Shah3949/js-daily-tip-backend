const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const helmet = require('helmet');
const multer = require('multer');
const cron = require('node-cron');


dotenv.config();

connectDB();

require('./services/emailScheduler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());// for react frontend
const upload = multer()//for parsing form data




// Routes
const subscriberRoutes = require('./routes/subscriberRoutes');
app.use('/api/subscribers', subscriberRoutes);


// Middleware
app.use(cors());
app.use(helmet());






PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`🚀 Server running on port ${PORT}`);
    
})