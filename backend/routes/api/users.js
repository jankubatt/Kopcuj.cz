const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN
    }
});

require('dotenv').config()

router.get("/", (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(() => res.status(404).json({error: 'No user found'}));
});

//gets user by name
router.get("/checkName/:name", (req, res) => {
    User.findOne({login: req.params.name})
        .then(users => res.json(users))
        .catch(() => res.status(404).json({error: 'No user found'}));
});

//gets user by email
router.get("/checkEmail/:email", (req, res) => {
    User.findOne({email: req.params.email})
        .then(users => res.json(users))
        .catch(() => res.status(404).json({error: 'No user found'}));
});

//gets user by authToken
router.get("/token/:auth", (req, res) => {
    User.findOne({"authToken": req.params.auth})
        .then(user => res.json(user))
        .catch(() => res.status(404).json({error: 'No user found'}));
});

//gets user by id
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(() => res.status(404).json({error: 'No user found'}));
});

router.get("/verify/:token", (req, res) => {
    User.findOne({verifyToken: req.params.token}).then((user) => {
        User.updateOne({"_id": user.id}, {$set: {"isVerified": true}}).then(() => {res.redirect("http://localhost:3000/")});
    })
})

//registers a user
router.post("/register", (req, res) => {
    let token = crypto.randomUUID();
    bcrypt.hash(req.body.pass, 10).then(function (hash) {
        let mailOptions = {
            from: "kopcuj@gmail.com",
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

        User.create({
            ...req.body,
            pass: hash,
            verifyToken: token,
            date_registered: Date.now()
        }).then(() => res.send("/login")).catch(() => {
            res.status(400);
        });
    });
});

router.post("/forgot-password", (req, res) => {
    let token = crypto.randomUUID();

    User.updateOne({"email": req.body.email}, {$set: {"forgotPassToken": token}}).then(() => {
        let mailOptions = {
            from: "kopcuj@gmail.com",
            to: req.body.email,
            subject: 'Zapomenuté heslo',
            html: `Na tomto odkazu si můžete změnit heslo. Přejeme úspěšné chození.\n<a href="http://localhost:3000/change-password?token=${token}">http://localhost:3000/change-password?token=${token}</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Forgotten Password Email sent: ' + info.response);
            }
        });

        res.sendStatus(200);
    });
})

router.post("/change-password", (req, res) => {
    bcrypt.hash(req.body.pass, 10).then(function (hash) {
        User.updateOne({"forgotPassToken": req.body.token}, {$set: {"pass": hash}}).then(() => {res.sendStatus(200)});
    });
})

router.post("/login", (req, res) => {
    User.findOne({login: req.body.login}).then((user) => {
        bcrypt.compare(req.body.pass, user.pass).then(function (result) {
            if (result) {
                const token = crypto.randomUUID();
                User.updateOne({"_id": user.id}, {$set: {"authToken": token, "date_lastLogin": new Date()}}).then();

                res.cookie("authToken", token, {maxAge: 1000 * 3600 * 24, sameSite: false});
                res.send("/").status(200);
            } else {
                res.sendStatus(400);
            }
        });
    }).catch(() => {
        res.sendStatus(400);
    })
});

router.post('/addHill', (req, res) => {
    User.updateOne({authToken: req.body.authToken}, {$push: {hills: req.body.hillId}}).then(() => {
        res.sendStatus(200);
    });
});

module.exports = router;