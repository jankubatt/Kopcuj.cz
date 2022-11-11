const express = require('express');
const router = express.Router();

// Load hill model
const Discussion = require('../../models/Discussion');

router.get('/', (req, res) => {
    Discussion.find().sort({date_added: -1})
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

router.post('/reply', (req, res) => {
    Discussion.updateOne({_id: req.body.id_discussion}, {
        $push: {replies: req.body.reply}
    }).then(res.sendStatus(200))
})

module.exports = router;