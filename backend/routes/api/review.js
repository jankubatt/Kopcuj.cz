const express = require('express');
const router = express.Router();

// Load hill model
const Review = require('../../models/Review');

router.get('/', (req, res) => {
    res.sendStatus(200);
})

router.get('/:hillId', (req, res) => {
    Review.find({id_hill: req.params.hillId}).then(hills => res.json(hills));
})

router.post('/', (req, res) => {
    Review.updateOne({id_user: req.body.userId, id_hill: req.body.hillId}, {
        $set: {
            id_user: req.body.userId,
            id_hill: req.body.hillId,
            stars: req.body.stars,
            text: req.body.text
        }
    }, {upsert: true})
        .then(res.status(200))
        .catch(err => res.status(404).json(err));
});

module.exports = router;