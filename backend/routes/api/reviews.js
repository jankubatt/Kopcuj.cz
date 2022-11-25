const express = require('express');
const router = express.Router();
const Reviews = require('../../models/Review');
const User = require('../../models/User');
const Hill = require('../../models/Hill');

let mysql = require('mysql');
let config = require('../../config/db.js');
let db = mysql.createConnection(config);


router.get('/', (req, res) => {
    let sql = `SELECT * FROM reviews`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.get('/:hillId', (req, res) => {
    let sql = `SELECT * FROM reviews WHERE hill='${req.params.hillId}'`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.post('/addReview', (req, res) => {
    let sql = `INSERT INTO reviews (hill, user, stars, text) VALUES ('${req.body.id_hill}', '${req.body.id_user}', '${req.body.stars}', '${req.body.text}')`;
    db.query(sql, (err, result) => {

    });

    if (req.body.difficulty !== null) {
    }

    if (req.body.food !== null) {
    }

    if (req.body.parking !== null) {
    }

        if (req.body.path !== null) {
        }

        if (req.body.stroller !== null) {
        }
});

router.post('/addHelpful', (req, res) => {
    Reviews.updateOne({id_hill: req.body.hillId, _id: req.body.reviewId}, {
        $addToSet: {
            helpful: req.body.userId
        }
    }).then((response) => {
        if (response.modifiedCount == 0) {
            res.send("remove");
        } else {
            res.sendStatus(200);
        } 
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/removeHelpful', (req, res) => {
    Reviews.updateOne({id_hill: req.body.hillId, _id: req.body.reviewId}, {
        $pull: {
            helpful: {$in: [req.body.userId]}
        }
    }).then(() => {res.sendStatus(200)}).catch((err) => {
        console.log(err);
    })
});

module.exports = router;