require('dotenv').config()

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.web4u.cz',
    port: 25,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let mysql = require('mysql');
let config = require('../../config/db.js');
let db = mysql.createConnection(config);

router.get("/", (req, res) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, (err, result) => {
        res.send(result)
    })
});

//gets user by name
router.get("/checkLogin/:login", (req, res) => {
    let sql = `SELECT login FROM users WHERE login='${req.params.login}'`;
    db.query(sql, (err, result) => {
        if (result.length < 1)
            res.send("");
        else
            res.send(result)
    })
});

//gets user by email
router.get("/checkEmail/:email", (req, res) => {
    let sql = `SELECT email FROM users WHERE email='${req.params.email}'`;
    db.query(sql, (err, result) => {
        if (result.length < 1)
            res.send("");
        else
            res.send(result)
    })
});

//gets user by authToken
router.get("/:auth", (req, res) => {
    let sql = `SELECT * FROM users WHERE authToken='${req.params.auth}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
});

//gets user climbed hills by authToken
router.get("/:auth/climbedHills", (req, res) => {
    let sql = `SELECT hills.*
                FROM (hills JOIN hills_climbed ON hills.id = hills_climbed.hill)
                RIGHT JOIN users ON users.id = hills_climbed.user
                WHERE users.authToken="${req.params.auth}";`
    db.query(sql, (err, result) => {
        res.send(result);
    })
});

//gets user by id
router.get("/id/:id", (req, res) => {
    let sql = `SELECT * FROM users WHERE id='${req.params.id}'`
    db.query(sql, (err, result) => {
        res.send(result);
    })
});

router.get("/verify/:token", (req, res) => {
    let sql = `SELECT * FROM users WHERE verifyToken='${req.params.token}'`
    db.query(sql, (err, result) => {
        let sql = `UPDATE users SET isVerified=true WHERE id=${result[0].id}`
        db.query(sql, (err, result) => {
            res.redirect('http://localhost:3000')
        })
    })
})

//registers a user
router.post("/register", (req, res) => {
    let token = crypto.randomUUID();
    bcrypt.hash(req.body.pass, 10).then(function (hash) {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Ověření emailové adresy',
            html: `Děkujeme za vaši registraci, prosím ověřte email.\n<a href="http://localhost:8082/api/users/verify/${token}">ZDE</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('User Verification Email sent: ' + info.response);
            }
        });

        console.log('register')

        let sql = `INSERT INTO users (login, name, pass, email, verifyToken) VALUES ('${req.body.login}', '${req.body.name}', '${hash}', '${req.body.email}', '${token}')`;
        db.query(sql, (err, result) => {
            res.send(result)
        })
    });
});

router.post("/forgot-password", (req, res) => {
    let token = crypto.randomUUID();
    let sql = `UPDATE users SET forgotPassToken='${token}' WHERE email='${req.body.email}'`
    db.query(sql, (err, result) => {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Zapomenuté heslo',
            html: `Na tomto odkazu si můžete změnit heslo. Přejeme úspěšné chození.\n<a href="http://localhost:3000/change-password?token=${token}">http://localhost:3000/change-password?token=${token}</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Forgotten Password Email sent: ' + JSON.stringify(info));
            }
        });

        res.sendStatus(200);
    })
})

router.post("/change-password", (req, res) => {
    bcrypt.hash(req.body.pass, 10).then(function (hash) {
        let sql = `UPDATE users SET pass='${hash}' WHERE forgotPassToken='${req.body.token}'`;
        db.query(sql, (err, result) => {
            res.sendStatus(200)
        })
    });
})

router.post("/login", (req, res) => {
    let sql = `SELECT id, pass FROM users WHERE login='${req.body.login}'`;
    db.query(sql, (err, user) => {
        bcrypt.compare(req.body.pass, user[0].pass).then(function (result) {
            if (result) {
                const token = crypto.randomUUID();
                let sql = `UPDATE users SET authToken='${token}', lastLogin='${new Date().toISOString().slice(0, 19).replace('T', ' ')}' WHERE id=${user[0].id}`;
                db.query(sql, (err) => {
                })

                res.cookie("authToken", token, {maxAge: 1000 * 3600 * 24, sameSite: false});
                res.send("/").status(200);
            } else {
                res.sendStatus(400);
            }
        });
    })
});

router.post('/addHill', (req, res) => {
    let sql = `INSERT INTO hills_climbed (hill, user) VALUES ('${req.body.id_hill}', '${req.body.id_user}')`;
    db.query(sql, (err) => {
        res.sendStatus(200)
    })
});

module.exports = router;