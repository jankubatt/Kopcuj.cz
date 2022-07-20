const express = require('express');
const router = express.Router();

// Load hill model
const Hill = require('../../models/Hill');

// @route GET api/hills/test
// @description tests hills route
// @access Public
router.get('/test', (req, res) => res.send('hill route testing!'));

// @route GET api/hills
// @description Get all hills
// @access Public
router.get('/', (req, res) => {
    Hill.find()
        .then(hills => res.json(hills))
        .catch(err => res.status(404).json({nohillsfound: 'No hills found'}));
});

// @route GET api/hills/:id
// @description Get single hill by id
// @access Public
router.get('/:id', (req, res) => {
    Hill.findById(req.params.id)
        .then(hill => res.json(hill))
        .catch(err => res.status(404).json({nohillfound: 'No hill found'}));
});

// @route GET api/hills
// @description add/save hill
// @access Public
router.post('/', (req, res) => {
    Hill.create(req.body)
        .then(hill => res.json({msg: 'hill added successfully'}))
        .catch(err => res.status(400).json({error: 'Unable to add this hill'}));
});

// @route GET api/hills/:id
// @description Update hill
// @access Public
router.put('/:id', (req, res) => {
    Hill.findByIdAndUpdate(req.params.id, req.body)
        .then(hill => res.json({msg: 'Updated successfully'}))
        .catch(err =>
            res.status(400).json({error: 'Unable to update the Database'})
        );
});

// @route GET api/hills/:id
// @description Delete hill by id
// @access Public
router.delete('/:id', (req, res) => {
    Hill.findByIdAndRemove(req.params.id, req.body)
        .then(hill => res.json({mgs: 'hill entry deleted successfully'}))
        .catch(err => res.status(404).json({error: 'No such a hill'}));
});

module.exports = router;