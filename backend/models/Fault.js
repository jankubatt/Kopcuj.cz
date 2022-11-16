const mongoose = require('mongoose');

const FaultSchema = new mongoose.Schema({
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

module.exports = Faults = mongoose.model('fault', FaultSchema);