const mongoose = require('mongoose')


const tipSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }

})

const tipModel = mongoose.model('Tip', tipSchema)

module.exports = tipModel