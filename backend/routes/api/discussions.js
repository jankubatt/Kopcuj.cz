const express = require('express');
const router = express.Router();

// Load hill model
const Discussion = require('../../models/Discussion');

router.get('/', (req, res) => {
    Discussion.find()
        .then(discussions => res.json(discussions))
        .catch(err => res.status(404).json(err));
});

router.get('/:id', (req, res) => {
    Discussion.find({_id: req.params.id})
        .then(discussion => res.json(discussion[0]))
        .catch(err => res.status(404).json(err));
})

router.post('/create', (req, res) => {
    Discussion.create({...req.body}).then(res.sendStatus(200));
})

module.exports = router;