const express = require('express');
const router = express.Router();
const Review = require('../../models/Review');
const User = require('../../models/User');
const Hill = require('../../models/Hill');

router.get('/', (req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.status(404).json(err));
})

router.get('/:hillId', (req, res) => {
    Review.find({id_hill: req.params.hillId}).then(reviews => res.json(reviews));
})

router.post('/addReview', (req, res) => {
        Review.updateOne({"hill._id": req.body.hill._id, "user._id": req.body.user._id}, {
            $set: {
                user: req.body.user,
                hill: req.body.hill,
                stars: req.body.stars,
                text: req.body.text,
                date_added: new Date()
            }
        }, {upsert: true}).then(res.sendStatus(200)).catch((err) => {
            console.log(err)
        })

        if (req.body.difficulty !== null) {
            Hill.updateOne({_id: req.body.hillId}, {$addToSet : { difficulty: req.body.difficulty }}).then().catch((err) => {console.log(err)})
        }

        if (req.body.food !== null) {
            Hill.updateOne({_id: req.body.hillId}, {$addToSet : { food: req.body.food}}).then().catch((err) => {console.log(err)})
        }

        if (req.body.parking !== null) {
            Hill.updateOne({_id: req.body.hillId}, {$addToSet : {parking: req.body.parking}}).then().catch((err) => {console.log(err)})
        }

        if (req.body.path !== null) {
            Hill.updateOne({_id: req.body.hillId}, {$addToSet : {path: req.body.path}}).then().catch((err) => {console.log(err)})
        }

        if (req.body.stroller !== null) {
            Hill.updateOne({_id: req.body.hillId}, {$addToSet: {stroller: req.body.stroller}}).then().catch((err) => {
                console.log(err)
            })
        }
});

router.post('/addHelpful', (req, res) => {
    Review.updateOne({id_hill: req.body.hillId, _id: req.body.reviewId}, {
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
    Review.updateOne({id_hill: req.body.hillId, _id: req.body.reviewId}, {
        $pull: {
            helpful: { $in: [req.body.userId] }
        }
    }).then(() => {res.sendStatus(200)}).catch((err) => {
        console.log(err);
    })
});

module.exports = router;