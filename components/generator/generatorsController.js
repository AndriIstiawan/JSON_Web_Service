const { generateToken, findOneByemail, newLink } = require('./generatorsService');
const Generator = require('./generatorsModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/config')
const generatorController = {};

generatorController.register = async (req, res) => {
    try {
        let token = await generateToken(),
            tokenExpires = Date.now() + 604800000;
        Generator.register(new Generator({
            username: req.body.username,
            email: req.body.email,
            token: token,
            tokenExpires: tokenExpires,
        }), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).send('Error' + err);
            }
            passport.authenticate('local', {
                session: false
            })(req, res, () => {
                return res.status(201).send({
                    message: 'Success',
                    link: config.ip_address + '/api/v1/contributor/' + user.token
                });
            });
        });
    } catch (err) {
        return res.status(500).send('Error 2 ' + err);
    }
}

generatorController.login = async (req, res, next) => {
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Password yang anda masukan salah'
                });
            }
            req.login(user, { session: false }, (_err) => {
                if (_err) {
                    return res.status(500).json({ message: 'server bermasalah' });
                }
                // generate a signed json web token with the contents of user object and return it in the response
                const token = jwt.sign({ id: user.id, email: user.email }, 'super-secret-token');
                res.status(200).json({ user: user.email, name: user.username, token });
            });
        })(req, res);
    }
    catch (err) {
        res.status(500).json({ message: 'server bermasalah' });
    }
}

generatorController.newLink = async (req, res) => {
    try {
        let token = await generateToken(),
            tokenExpires = Date.now() + 604800000;
        let generator = await findOneByemail(req.user.email);
        let newlink = await newLink(token, tokenExpires, generator);
        res.status(200).json({
            message: 'Success',
            link: config.ip_address + '/api/v1/contributor/' + newlink.token
        });
    } catch (err) {
        return res.status(500).send({ message: 'server bermasalah' });
    }
}

module.exports = generatorController;
