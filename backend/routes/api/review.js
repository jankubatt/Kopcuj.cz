const express = require('express');
const router = express.Router();
const Review = require('../../models/Review');
const User = require('../../models/User');

router.get('/', (req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json(err));
})

router.get('/:hillId', (req, res) => {
    Review.find({id_hill: req.params.hillId}).then(reviews => res.json(reviews));
})

router.post('/addReview', (req, res) => {
    User.findOne({_id: req.body.userId}).then((user) => {
        Review.updateOne({id_hill: req.body.hillId, id_user: req.body.userId}, {
            $set: {
                id_user: user._id,
                user: {
                    login: user.login,
                    name: user.name,
                    pfp: user.pfp,
                    isAdmin: user.isAdmin
                },
                id_hill: req.body.hillId,
                stars: req.body.stars,
                text: req.body.text,
                date_added: new Date()
            }
        }, {upsert: true}).then().catch((err) => {
            console.log(err)
        })
    }).then(res.sendStatus(200))
        .catch(res.status(404));
});

module.exports = router;