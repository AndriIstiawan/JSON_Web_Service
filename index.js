const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const passportJWT = require('passport-jwt'),
    methodOverride = require('method-override')
const { Strategy } = require('passport-local');
const CONFIG = require('./config/config');
const dbConnBuilder = require('./_helper/db_conn_builder');

const apiUserRoute = require('./components/generator/generatorsRouteAPI');
const apiContributorRoute = require('./components/contributor/contributorsRouteAPI');

const app = express()

// App setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App config
app.use(methodOverride('_method')); // has to be declared before any route
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, sid'
    );
    res.header(
        'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT'
    );
    next();
});

// Passport Dependencies
const User = require('./components/generator/generatorsModel');
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
// Passport initialize for local strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
},
    User.authenticate()
));
// Inject User model with serializing & deserializing, or login and logout capabilities
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Passport initialize for JWT strategy
passport.use(new JWTstrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'super-secret-token'
},
    function (jwtPayload, cb) {
        return User.findById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

// Log the environment
console.log('Environment:', CONFIG.app);

// DB Setup
const dbConnUri = dbConnBuilder(CONFIG);
console.log('Connection URI:', dbConnUri);
mongoose.connect(dbConnUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

// Main App Route
app.get('/', function (req, res) {
    res.json({ message: "This is the api server main route", status: "OK" });
});

app.use('/api/v1/generator/', apiUserRoute);
app.use('/api/v1/contributor/', apiContributorRoute);

app.listen(process.env.PORT || 4000, function () {
    console.log('Application is running.. ');
    console.log('Open in your browser ' + CONFIG.ip_address);
});

module.exports = app;