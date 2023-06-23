const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    message: {
        required: true,
        type: String
    },
    recipient: {
        required: true,
        type: String
    },
    sender: {
        required: true,
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Messages', messagesSchema)