const express = require('express');
const router = express.Router();
const crypto = require("crypto");

let mysql = require('mysql');
let config = require('../../config/db.js');
let db = mysql.createConnection(config);


router.get('/', (req, res) => {
    let sql = `SELECT reviews.*, hills.name AS "hill_name" FROM reviews JOIN hills ON hills.id = reviews.hill`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.get('/hills', (req, res) => {
    let sql = `SELECT hills.name, SUM(reviews.stars)/COUNT(hills.name) AS "rating", hills_attributes.* FROM (hills JOIN hills_attributes ON hills.id=hills_attributes.hill) JOIN reviews ON hills_attributes.hill = reviews.hill;`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.get('/:hillId', (req, res) => {
    let sql = `SELECT reviews.* FROM reviews JOIN users ON users.id = reviews.user WHERE hill='${req.params.hillId}';`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.post('/addReview', (req, res) => {
    let sql = `UPDATE reviews SET stars='${req.body.stars}', text='${req.body.text}' WHERE user='${req.body.user}' AND hill='${req.body.hill}' `;
    db.query(sql, (err, result) => {
        console.log(result)
        if (result.affectedRows === 0) {
            sql = `INSERT INTO reviews (hill, user, stars, text) VALUES ('${req.body.hill}', '${req.body.user}', '${req.body.stars}', '${req.body.text}')`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        } else {
            res.sendStatus(200)
        }
    });

    if (req.body.difficulty) {
        let sql = `UPDATE hills_attributes SET difficulty=difficulty+1 WHERE hill='${req.body.hill}'`;
        db.query(sql);
    }

    if (req.body.food) {
        let sql = `UPDATE hills_attributes SET food=food+1 WHERE hill='${req.body.hill}'`;
        db.query(sql);
    }

    if (req.body.parking) {
        let sql = `UPDATE hills_attributes SET parking=parking+1 WHERE hill='${req.body.hill}'`;
        db.query(sql);
    }

    if (req.body.path) {
        let sql = `UPDATE hills_attributes SET path=path+1 WHERE hill='${req.body.hill}'`;
        db.query(sql);
    }

    if (req.body.stroller) {
        let sql = `UPDATE hills_attributes SET stroller=stroller+1 WHERE hill='${req.body.hill}'`;
        db.query(sql);
    }
});

router.post('/like', (req, res) => {
    let sql = `UPDATE reviews_likes SET random='${crypto.randomUUID()}' WHERE user='${req.body.user}' AND review='${req.body.review}'`;
    db.query(sql, (err, result) => {
        if (result.changedRows === 0) {
            sql = `INSERT INTO reviews_likes (review, user) VALUES ('${req.body.review}', '${req.body.user}')`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        } else {
            sql = `DELETE FROM reviews_likes WHERE user='${req.body.user}' AND review='${req.body.review}'`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        }
    });
})

router.get('/likeCount/:review', (req, res) => {
    let sql = `SELECT COUNT(reviews_likes.review) AS "count" FROM reviews_likes WHERE reviews_likes.review = '${req.params.review}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
})


module.exports = router;