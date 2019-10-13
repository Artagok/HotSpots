const express = require('express');
const router  = express.Router();

const PushPin = require('../../models/PushPin');

// @route   GET api/pushpins
// @desc    Get All PushPins
// @access  Public
router.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  PushPin.find()
    .sort({ date: -1})
    .then(pushpins => res.json(pushpins))
});

// @route   POST api/pushpins
// @desc    Create a PushPin
// @access  Public
router.post('/', (req, res) => {
  const newPushPin = new PushPin({
    type: req.body.type,
    description: req.body.description,
    coords: req.body.coords,
    event_count: req.body.event_count,
    locale: req.body.locale,
    q_air: req.body.q_air,
    child_infra: req.body.child_infra
  });
  newPushPin.save()
    .then(pushpin => res.json(pushpin));
});

// @route   DELETE api/pushpins/:id
// @desc    Delete a PushPin
// @access  Public
router.delete('/:id', (req, res) => {
  PushPin.findById(req.params.id)
    .then(pushpin => pushpin.remove()
      .then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404)
      .json({ success: false, message: 'Invalid ID' }));
});

module.exports = router;