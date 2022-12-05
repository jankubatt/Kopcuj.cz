const express = require('express');
const router = express.Router();
const crypto = require("crypto");
let mysql = require('mysql');
let config = require('../../config/db.js');
let db = mysql.createConnection(config);

router.get('/', (req, res) => {
    let sql = `SELECT * FROM discussions ORDER BY created DESC`
    db.query(sql, (err, result) => {
        res.send(result);
    })
});

router.get('/replies', (req, res) => {
    let sql = `SELECT * FROM discussions_replies`;
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM discussions WHERE id='${req.params.id}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

router.get('/:id/replies', (req, res) => {
    let sql = `SELECT * FROM discussions_replies WHERE discussion='${req.params.id}'`
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
    let sql = `INSERT INTO discussions_replies (discussion, user, text) VALUES ('${req.body.discussion}', '${req.body.user}', '${req.body.text}')`
    db.query(sql, (err, result) => {
        res.sendStatus(200);
    })
})

router.post('/reply/downvote', (req, res) => {
    let sql = `UPDATE discussions_replies_downvotes SET random='${crypto.randomUUID()}' WHERE user='${req.body.user}'`;
    db.query(sql, (err, result) => {
        if (result.changedRows === 0) {
            sql = `INSERT INTO discussions_replies_downvotes (discussion, user) VALUES ('${req.body.discussion}', '${req.body.user}')`;
            db.query(sql, () => {
                sql = `DELETE FROM discussions_replies_upvotes WHERE discussion='${req.body.discussion}' AND user='${req.body.user}'`;
                db.query(sql, () => {
                    res.sendStatus(200)
                });
            });
        } else {
            sql = `DELETE FROM discussions_replies_downvotes WHERE user='${req.body.user}' AND discussion='${req.body.discussion}'`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        }
    });
})

router.post('/reply/upvote', (req, res) => {
    let sql = `UPDATE discussions_replies_upvotes SET random='${crypto.randomUUID()}' WHERE user='${req.body.user}'`;
    db.query(sql, (err, result) => {
        if (result.changedRows === 0) {
            sql = `INSERT INTO discussions_replies_upvotes (discussion, user) VALUES ('${req.body.discussion}', '${req.body.user}')`;
            db.query(sql, () => {
                sql = `DELETE FROM discussions_replies_downvotes WHERE discussion='${req.body.discussion}' AND user='${req.body.user}'`;
                db.query(sql, () => {
                    res.sendStatus(200)
                });
            });
        } else {
            sql = `DELETE FROM discussions_replies_upvotes WHERE user='${req.body.user}' AND discussion='${req.body.discussion}'`;
            db.query(sql, () => {
                res.sendStatus(200)
            });
        }
    });
})

router.get(`/reply/:id/rating`, (req, res) => {
    let upvotes = 0;
    let downvotes = 0;

    let sql = `SELECT COUNT(discussion) AS "count" FROM discussions_replies_downvotes WHERE discussion='${req.params.id}'`;
    db.query(sql, (err, result) => {
        downvotes = result[0].count;

        let sql = `SELECT COUNT(discussion) AS "count" FROM discussions_replies_upvotes WHERE discussion='${req.params.id}'`;
        db.query(sql, (err, result) => {
            upvotes = result[0].count;

            res.send({upvotes: upvotes, downvotes: downvotes})
        })
    })

})

module.exports = router;