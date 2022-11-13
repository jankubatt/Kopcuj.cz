const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    hill: {
        type: Object,
        required: true,
        default: {}
    },
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