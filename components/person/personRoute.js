const express = require('express');
const router = express.Router();
const { getPerson } = require('./personController')

// Retrieve ByOwner AR content
router.get('/person', getPerson);

module.exports = router;
