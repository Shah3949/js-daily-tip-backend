// server/controllers/unsubscribeController.js
const Subscriber = require("../models/Subscriber");

const unsubscribeUser = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const subscriber = await Subscriber.findById(userId);

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found." });
    }

    if (subscriber.unsubscribeToken !== token) {
      return res.status(403).json({ message: "Invalid unsubscribe token." });
    }

    subscriber.unsubscribed = true;
    // subscriber.unsubscribeToken = undefined; // Optional: invalidate the token
    await subscriber.save();

    res.send('You have successfully unsubscribed')
    // res.status(200).json({ message: "You have successfully unsubscribed." });
  } catch (error) {
    console.error("Error in unsubscribeController:", error);
    res.status(500).json({ message: "Server error while unsubscribing." });
  }
};



module.exports = { unsubscribeUser };
