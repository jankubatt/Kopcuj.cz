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

//GET all users
router.get("/", (req, res) => {
    let sql = `SELECT * FROM users`;

    db.query(sql, (e, r) => res.send(r));
});

//GET users climbed hills
router.get("/climbedHills", (req, res) => {
    let sql = `SELECT hills.*, hills_climbed.user FROM (hills JOIN hills_climbed ON hills.id = hills_climbed.hill) RIGHT JOIN users ON users.id = hills_climbed.user;`;

    db.query(sql, (e, r) => res.send(r));
});

//GET user by authToken
router.get("/:authToken", (req, res) => {
    let sql = `SELECT * FROM users WHERE authToken='${req.params.authToken}';`;

    db.query(sql, (e, r) => res.send(r));
});

//GET users climbed hills by authToken
router.get("/:authToken/climbedHills", (req, res) => {
    let sql = `SELECT hills.* FROM (hills JOIN hills_climbed ON hills.id = hills_climbed.hill) RIGHT JOIN users ON users.id = hills_climbed.user WHERE users.authToken="${req.params.authToken}";`;

    db.query(sql, (e, r) => res.send(r));
});

//GET user by ID
router.get("/id/:id", (req, res) => {
    let sql = `SELECT * FROM users WHERE id='${req.params.id}';`;

    db.query(sql, (e, r) => res.send(r));
});

//Register user
router.post("/register", (req, res) => {
    let verificationToken = crypto.randomUUID();

    bcrypt.hash(req.body.pass, 10).then((hash) => {
        let sql = `INSERT INTO users (login, name, pass, email, verifyToken) VALUES ('${req.body.login}', '${req.body.name}', '${hash}', '${req.body.email}', '${verificationToken}');`;

        db.query(sql, () => {
            //Send email
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.email,
                subject: 'Kopcuj - Ověření emailové adresy',
                html: `Děkujeme za vaši registraci, prosím ověřte email.\n<a href="http://localhost:8080/api/users/verify/${verificationToken}">http://localhost:8080/api/users/verify/${verificationToken}</a>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error)
                    console.log(error);
                else
                    console.log('User Verification Email sent: ' + info.response);
            });

            res.sendStatus(200);
        })
    });
});

//Login user
router.post("/login", (req, res) => {
    let sql = `SELECT id, pass FROM users WHERE login='${req.body.login}';`;

    db.query(sql, (e, r) => {
        if (r === undefined) return res.sendStatus(503);

        bcrypt.compare(req.body.pass, r[0].pass).then((bcrypt_result) => {
            if (bcrypt_result) {
                let authToken = crypto.randomUUID();

                let sql = `UPDATE users SET authToken='${authToken}', lastLogin='${new Date().toISOString().slice(0, 19).replace('T', ' ')}' WHERE id=${r[0].id};`;
                db.query(sql);

                res.cookie("authToken", authToken, {maxAge: 1000 * 3600 * 24, sameSite: false});
                res.sendStatus(200);
            } else {
                res.send("details").status(401);
            }
        });
    })
});

//Checks if user with login exists
router.get("/checkLogin/:login", (req, res) => {
    let sql = `SELECT login FROM users WHERE login='${req.params.login}'`;

    db.query(sql, (e, r) => {
        if (r.length < 1)
            res.send("");
        else
            res.send(r);
    })
});

//Checks if user with email exists
router.get("/checkEmail/:email", (req, res) => {
    let sql = `SELECT email FROM users WHERE email='${req.params.email}'`;

    db.query(sql, (e, r) => {
        if (r.length < 1)
            res.send("");
        else
            res.send(r);
    })
});

//Verify user
router.get("/verify/:token", (req, res) => {
    let sql = `SELECT * FROM users WHERE verifyToken='${req.params.token}';`;

    db.query(sql, (e, r) => {
        let sql = `UPDATE users SET isVerified=true WHERE id=${r[0].id};`;

        db.query(sql, () => res.redirect('http://localhost:3000'));
    }).catch(() => console.log("Verification Error"));
})


//User forgotten password
router.post("/forgot-password", (req, res) => {
    let forgotPassToken = crypto.randomUUID();
    let sql = `UPDATE users SET forgotPassToken='${forgotPassToken}' WHERE email='${req.body.email}';`;

    db.query(sql, () => {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Zapomenuté heslo',
            html: `Na tomto odkazu si můžete změnit heslo. Přejeme úspěšné chození.\n<a href="http://localhost:3000/change-password?token=${forgotPassToken}">http://localhost:3000/change-password?token=${forgotPassToken}</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.log(error);
            else
                console.log('Forgotten Password Email sent: ' + info.response);
        });

        res.sendStatus(200);
    })
})

//Change users password
router.post("/change-password", (req, res) => {
    bcrypt.hash(req.body.pass, 10).then((hash) => {
        let sql = `UPDATE users SET pass='${hash}' WHERE forgotPassToken='${req.body.token}';`;

        db.query(sql, () => res.sendStatus(200));
    });
})

//Mark hill as climbed
router.post('/addClimbed', (req, res) => {
    let sql = `INSERT INTO hills_climbed (hill, user) VALUES ('${req.body.id_hill}', '${req.body.id_user}');`;

    db.query(sql, () => res.sendStatus(200));
});

//Change description of user
router.post('/description', (req, res) => {
    let sql = `UPDATE users SET description='${req.body.desc}' WHERE authToken="${req.body.authToken}";`

    db.query(sql, (e, r) => {
        console.log(e, r);
        res.sendStatus(200)
    })
});

module.exports = router;