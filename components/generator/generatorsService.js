const Generator = require('./generatorsModel');

const crypto = require('crypto');

exports.generateToken = async () => {
    try {
        let buf = await crypto.randomBytes(20);
        return buf.toString('hex');
    } catch (e) {
        // Log Errors
        return e;
    }
}

exports.findOneByemail = async (email) => {
    return Generator.findOne({ email: email });
}

exports.newLink = async (token, tokenExpires, generator) => {
    generator.token = token;
    generator.tokenExpires = tokenExpires;
    return generator.save()
}
