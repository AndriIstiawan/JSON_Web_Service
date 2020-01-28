const express = require('express');
const generatorController = require('./generatorsController');
const { checkUserLogin } = require('../middlewares/checkUser')

const router = express.Router();

router.post('/register', (req, res) => {
    generatorController.register(req, res);
});

router.post('/login', checkUserLogin, (req, res, next) => {
    generatorController.login(req, res, next);
});

module.exports = router;
