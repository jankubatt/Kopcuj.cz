const express = require('express');
const router = express.Router();

// Load hill model
const Hill = require('../../models/Hill');

router.get('/', (req, res) => {
    Hill.find()
        .then(hills => res.json(hills))
        .catch(err => res.status(404).json({nohillsfound: 'No hills found'}));
});

module.exports = router;