const express = require('express');
const router = express.Router();

// Load hill model
const Discussion = require('../../models/Discussion');
const crypto = require("crypto");

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
        $push: {replies: {_id: crypto.randomUUID(), ...req.body.reply, downVotes: [], upVotes: []}}
    }).then(res.sendStatus(200))
})

router.post('/reply/downvote', (req, res) => {
    Discussion.updateOne({"replies._id": req.body.id_reply}, {
        $addToSet: {
            "replies.$.downVotes": req.body.userId
        },
        $pull: {
            "replies.$.upVotes": {$in: [req.body.userId]}
        }
    }).then(res.sendStatus(200))
})

router.post('/reply/upvote', (req, res) => {
    Discussion.updateOne({"replies._id": req.body.id_reply}, {
        $addToSet: {
            "replies.$.upVotes": req.body.userId
        },
        $pull: {
            "replies.$.downVotes": {$in: [req.body.userId]}
        }
    }).then(res.sendStatus(200))
})

module.exports = router;