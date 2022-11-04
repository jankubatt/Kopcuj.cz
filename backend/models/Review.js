const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    id_hill: {
        type: String,
        required: true
    },
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
    stars: {
        type: Number,
        required: true
    },
    helpful: {
        type: Array,
        required: true,
        default: []
    },
    text: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);