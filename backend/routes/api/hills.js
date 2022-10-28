const express = require('express');
const router = express.Router();

// Load hill model
const Hill = require('../../models/Hill');

router.get('/', (req, res) => {
    Hill.find()
        .then(hills => res.json(hills))
        .catch(err => res.status(404).json(err));
});

router.get('/name/:name', (req, res) => {
    Hill.find({name: req.params.name})
        .then(hills => res.json(hills))
        .catch(err => res.status(404).json(err));
})

router.post('/create', (req, res) => {
    Hill.create({...req.body}).then(res.sendStatus(200));
})

module.exports = router;