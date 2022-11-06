const mongoose = require('mongoose');

const HillSchema = new mongoose.Schema({
    name: {
        type: String
    },
    elevation: {
        type: Number
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    prominence: {
        type: String
    },
    isolation: {
        type: String
    },
    material: {
        type: String
    },
    basin: {
        type: String
    },
    district: {
        type: String
    },
    location: {
        type: String
    },
    rating: {
        type: Array,
        required: false,
        default: []
    },
    difficulty: {
        type: Array,
        required: true,
        default: []
    },
    path: {
        type: Array,
        required: true,
        default: []
    },
    stroller: {
        type: Array,
        required: true,
        default: []
    },
    parking: {
        type: Array,
        required: true,
        default: []
    },
    food: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = Hill = mongoose.model('hill', HillSchema);