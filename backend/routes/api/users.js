const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

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

//gets user by id
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(() => res.status(404).json({error: 'No user found'}));
});

//registers a user
router.post("/register", (req, res) => {
    bcrypt.hash(req.body.pass, 10).then(function (hash) {
        User.create({
            ...req.body,
            pass: hash,
            date_registered: Date.now()
        }).then(() => res.status(200)).catch(() => {
            res.status(400);
        });
    });
});

module.exports = router;