const request = require('request');

exports.getPerson = async (req, res) => {
    let options = {
        url: 'https://randomuser.me/api/'
    }
    request.get(options, async (err, resp, body) => {
        if (err) {
            return res.status(500).json(err)
        }
        let newdata = JSON.parse(body)
        let person = {
            'gender': newdata.results[0].gender,
            'fullname': newdata.results[0].name.title + ' ' + newdata.results[0].name.first + ' ' + newdata.results[0].name.last,
            'address': newdata.results[0].location.street.number + ' ' + newdata.results[0].location.street.name + ' ' + newdata.results[0].location.city,
            'picture': newdata.results[0].picture.large,
        }
        return res.status(200).json(person)
    })
}