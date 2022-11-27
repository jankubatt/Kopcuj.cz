const express = require('express');
const router = express.Router();

// Load hill model
const Discussion = require('../../models/Discussion');
const crypto = require("crypto");

router.get('/', (req, res) => {
    let sql = `SELECT * FROM discussions ORDER BY created DESC`
    db.query(sql, (err, result) => {
        res.send(result);
    })
});

router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM discussions WHERE id='${req.params.id}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.post('/create', (req, res) => {
    let sql = `INSERT INTO discussions (user, subject, text) VALUES ('${req.body.id_user}', '${req.body.subject}', '${req.body.text}')`
    db.query(sql, (err, result) => {
        res.sendStatus(200);
    })
})

router.post('/reply', (req, res) => {
    let sql = `INSERT INTO replies (discussion, user, text) VALUES ('${req.body.id_user}', '${req.body.subject}', '${req.body.text}')`
    db.query(sql, (err, result) => {
        res.sendStatus(200);
    })

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