// server/routes/subscriberRoutes.js
const express = require('express');
const router = express.Router();
const { subscribeUser, getSubscriberById } = require('../controllers/subscribeController');
const { unsubscribeUser } = require('../controllers/unsubscribeController');
const { unsubConfirmation } = require('../services/emailScheduler')




router.post('/subscribe', subscribeUser);
router.get('/:id', getSubscriberById); // 👈 new route


router.get('/unsubscribe/unsubConfirmation', unsubConfirmation );

router.get('/unsubscribe/:userId/:token', unsubscribeUser);


module.exports = router;
