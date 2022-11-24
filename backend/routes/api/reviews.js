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
    Reviews.updateOne({"hill._id": req.body.hill._id, "user._id": req.body.user._id}, {
        $set: {
            user: req.body.user,
            hill: req.body.hill,
            stars: req.body.stars,
            text: req.body.text,
            date_added: new Date()
        }
    }, {upsert: true}).then(res.sendStatus(200)).catch((err) => {
            console.log(err)
        })

        if (req.body.difficulty !== null) {
            Hill.updateOne({_id: req.body.hill._id}, {$addToSet: {difficulty: req.body.difficulty}}).then().catch((err) => {
                console.log(err)
            })
        }

        if (req.body.food !== null) {
            Hill.updateOne({_id: req.body.hill._id}, {$addToSet: {food: req.body.food}}).then().catch((err) => {
                console.log(err)
            })
        }

        if (req.body.parking !== null) {
            Hill.updateOne({_id: req.body.hill._id}, {$addToSet: {parking: req.body.parking}}).then().catch((err) => {
                console.log(err)
            })
        }

        if (req.body.path !== null) {
            Hill.updateOne({_id: req.body.hill._id}, {$addToSet: {path: req.body.path}}).then().catch((err) => {
                console.log(err)
            })
        }

        if (req.body.stroller !== null) {
            Hill.updateOne({_id: req.body.hill._id}, {$addToSet: {stroller: req.body.stroller}}).then().catch((err) => {
                console.log(err)
            })
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