// emailScheduler.js
const cron = require("node-cron");
const dotenv = require("dotenv");
const Subscriber = require("../models/Subscriber");
const { tips } = require("../utils/seedTips");
const sendMail = require("./sendTipEmail");

const fs = require("fs");
const path = require("path");

dotenv.config();

// Load HTML file content
const templatePath1 = path.join(__dirname, "tip.html");
let htmlContent = fs.readFileSync(templatePath1, "utf8");
const templatePath2 = path.join(__dirname, "unsubConfirmation.html");
let unsubContent = fs.readFileSync(templatePath2, "utf8");

// Get a random tip from the tips array
const getRandomTip = () => {
  const index = Math.floor(Math.random() * tips.length);
  return tips[index].content;
};

// Schedule a job to run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"

  try {
    const subscribers = await Subscriber.find({
      preferredTime: currentTime,
      unsubscribed: false,
    });

    
      subscribers.forEach((sub) => {
        for (let i = 0; i < sub.tipsPerDay; i++) {
        const tip = getRandomTip();
        const message = `Hi ${sub.name},\n\n<br>Here's your JavaScript Tip of the Day:\n\n<br>${tip}`;
        // Replace placeholders

        // const unsubscribeConfirmationPage = `http://localhost:${process.env.PORT}/api/subscribers/unsubscribe/unsubConfirmation?userId=${sub._id}&token=${sub.unsubscribeToken}`;
        const unsubscribeConfirmationPage = `https://js-daily-tip-backend.onrender.com//api/subscribers/unsubscribe/unsubConfirmation?userId=${sub._id}&token=${sub.unsubscribeToken}`;

        let personalizedContent = htmlContent
          .replace("{{name}}", sub.name)
          .replace("{{tip}}", tip)
          .replace("{{link}}", unsubscribeConfirmationPage);

        sendMail(sub.email, personalizedContent, tip);
      }
      });
    
  } catch (error) {
    console.error("Error fetching subscribers:", error);
  }
});

// const unsubLink = `http://localhost:${process.env.PORT}/api/subscribers/unsubscribe/${sub.id}/${sub.unsubscribeToken}`;
// unsubContent.replace("{{unsubLink}}", unsubLink);

//renderring unsubConfirm filr
const unsubConfirmation = async (req, res) => {
  try {
    return res.sendFile(templatePath2);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { unsubConfirmation };
