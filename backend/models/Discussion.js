const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true
    },
    user: {
        login: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false,
            default: null
        },
        pfp: {
            type: String,
            required: false,
            default: null
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
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