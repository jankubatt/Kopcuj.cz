const express = require('express');
const router = express.Router();
const Fault = require('../../models/Fault');

router.get('/', (req, res) => {
    Fault.find()
        .then(faults => res.json(faults))
        .catch(err => res.status(404).json(err));
})

router.get('/:hillId', (req, res) => {
    Fault.find({"hill._id": req.params.hillId}).then(faults => res.json(faults));
})

router.post('/addFault', (req, res) => {
    Fault.updateOne({"hill._id": req.body.hill._id, "user._id": req.body.user._id}, {
        $set: {
            user: req.body.user,
            hill: req.body.hill,
            text: req.body.text,
            date_added: new Date()
        }
    }, {upsert: true}).then(res.sendStatus(200)).catch((err) => {
        console.log(err)
    })
});

router.post('/addHelpful', (req, res) => {
    Fault.updateOne({id_hill: req.body.hillId, _id: req.body.faultId}, {
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
    Fault.updateOne({id_hill: req.body.hillId, _id: req.body.faultId}, {
        $pull: {
            helpful: {$in: [req.body.userId]}
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log(err);
    })
});

module.exports = router;