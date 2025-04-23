// server/controllers/subscribeController.js
const Subscriber = require("../models/Subscriber");
const crypto = require('crypto');


const subscribeUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }




  console.log("Received request body:", req.body);

  const {
    name,
    email,
    tipsPerDay,
    preferredTime,
    unsubscribed,
    unsubscribeToken = crypto.randomBytes(20).toString('hex'),
  } = req.body;

  try {
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You’ve already subscribed with this email." });
    }

    const newSubscriber = new Subscriber({
      name,
      email,
      tipsPerDay,
      preferredTime,
      unsubscribed,
      unsubscribeToken,
    });

    await newSubscriber.save();
    res
      .status(201)
      .json({
        message: "🎉 Subscription successful!",
        subscriber: newSubscriber,
      });
  } catch (error) {
    console.error("❌ Error subscribing user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const getSubscriberById = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found', msg : req.params.id });
    }
    res.status(200).json(subscriber);
  } catch (error) {
    console.error('Error fetching subscriber:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  subscribeUser,
  getSubscriberById,// 👈 export it
};
// module.exports = { subscribeUser };
