const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true,
        default: {}
    },
    date_added: {
        type: Date,
        required: true,
        default: Date.now()
    },
    subject: {
        type: String,
        required: true,
        default: "Nepojmenovaná diskuze"
    },
    text: {
        type: String,
        required: false,
        default: null
    },
    replies: {
        type: Array,
        required: false,
        default: []
    }
});

module.exports = Discussion = mongoose.model('discussion', DiscussionSchema);