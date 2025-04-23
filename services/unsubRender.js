const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const fs = require("fs");
const path = require("path");



const templatePath2 = path.join(__dirname, "unsubConfirmation.html");
let unsubContent = fs.readFileSync(templatePath2, "utf8");

const unsubscribeLink = `http://localhost:${PORT}/api/subscribers/unsubscribe/${sub._id}/${sub.unsubscribeToken}`;
unsubContent.replace("{{link}}", unsubscribeLink);

const unsubConfirmation = async (req, res) => {
  try {
    return res.render(unsubConfirmation.html);
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    res.status(500).json({ message: "Server error" });
  }
};

