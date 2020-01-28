const express = require('express');
const router = express.Router();
const { create } = require('./contributorsController');

// Update one VR content
router.post('/:token', create);

module.exports = router;