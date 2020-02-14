const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const CONFIG = require('./config/config')

const app = express()

const getPerson = require('./components/person/personRoute');

// App setup
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Main App Route
app.get('/', function (req, res) {
    res.json({ message: "This is the api server main route", status: "OK" });
});

app.use('/api/', getPerson);

app.listen(process.env.PORT || 4000, function () {
    console.log('Application is running.. ');
    console.log('Open in your browser ' + CONFIG.ip_address);
});

module.exports = app;