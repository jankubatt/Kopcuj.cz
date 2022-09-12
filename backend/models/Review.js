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
    date_added: {
        type: Date,
        required: true,
        default: Date.now()
    },
    stars: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema);