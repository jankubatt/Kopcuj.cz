const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    authToken: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        default: null
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    hills: {
        type: Array,
        required: false,
        default: null
    },
    comments: {
        type: Array,
        required: false,
        default: null
    },
    reviews: {
        type: Array,
        required: false,
        default: null
    },
    pfp: {
        type: String,
        required: false,
        default: null
    },
    theme: {
        type: String,
        required: false,
        default: "green"
    },
    date_registered: {
        type: Date,
        required: true,
        default: Date.now()
    },
    date_lastLogin: {
        type: Date,
        required: false,
        default: null
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);