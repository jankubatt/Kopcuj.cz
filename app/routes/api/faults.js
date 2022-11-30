const express = require('express');
const router = express.Router();
let mysql = require('mysql');
let config = require('../../config/db.js');
const crypto = require("crypto");
let db = mysql.createConnection(config);

router.get('/', (req, res) => {
    let sql = `SELECT * FROM faults`
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.get('/:hillId', (req, res) => {
    let sql = `SELECT * FROM faults WHERE hill='${req.params.hillId}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.post('/addFault', (req, res) => {
    let sql = `UPDATE faults SET text='${req.body.text}' WHERE user='${req.body.user}' AND hill='${req.body.hill}' `;
    db.query(sql, (err, result) => {
        if (result.changedRows === 0) {
            sql = `INSERT INTO faults (hill, user, text) VALUES ('${req.body.hill}', '${req.body.user}', '${req.body.text}')`;
            db.query(sql, (err) => {
                console.log(err)
                res.sendStatus(200)
            });
        } else {
            res.sendStatus(200)
        }
    });
});

router.post('/like', (req, res) => {
    let sql = `UPDATE faults_likes SET random='${crypto.randomUUID()}' WHERE user='${req.body.user}' AND fault='${req.body.fault}'`;
    db.query(sql, (err, result) => {
        if (result.changedRows === 0) {
            sql = `INSERT INTO faults_likes (fault, user) VALUES ('${req.body.fault}', '${req.body.user}')`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        } else {
            sql = `DELETE FROM faults_likes WHERE user='${req.body.user}' AND fault='${req.body.fault}'`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        }
    });
})

router.get('/likeCount/:fault', (req, res) => {
    let sql = `SELECT COUNT(faults_likes.fault) AS "count" FROM faults_likes WHERE faults_likes.fault = '${req.params.fault}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

module.exports = router;