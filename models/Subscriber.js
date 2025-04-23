const mongoose = require('mongoose')

//schema

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tipsPerDay: {
        type: Number,
        required: true,
    },
    preferredTime: {
        type: String,
        required: true,
    },
    unsubscribed: {
        type: Boolean,
        default: false,
    },
    unsubscribeToken: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

const subscriber = mongoose.model("subscriber", subscriberSchema )

module.exports = subscriber