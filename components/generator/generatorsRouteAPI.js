const express = require('express');
const generatorController = require('./generatorsController');
const { checkUserLogin } = require('../middlewares/checkUser');
const passport = require('passport');

const router = express.Router();

router.post('/register', (req, res) => {
    generatorController.register(req, res);
});

router.post('/login', checkUserLogin, (req, res, next) => {
    generatorController.login(req, res, next);
});

router.post('/new-link', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    generatorController.newLink(req, res, next);
});

module.exports = router;
