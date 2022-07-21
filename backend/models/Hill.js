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
});

module.exports = Hill = mongoose.model('hill', HillSchema);