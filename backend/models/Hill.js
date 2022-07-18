const mongoose = require('mongoose');

const HillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = Hill = mongoose.model('hill', HillSchema);