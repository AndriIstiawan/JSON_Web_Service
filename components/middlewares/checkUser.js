const Generator = require("../generator/generatorsModel");

exports.checkUserLogin = async (req, res, next) => {
    let user = await Generator.findOne({ username: req.body.username })
    if (!user) {
        return res.status(400).send({ message: "Username yang anda masukan salah" })
    }
    return next()
}