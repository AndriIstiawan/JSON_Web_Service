const crypto = require('crypto');

exports.generateToken = async () => {
    try {
        let buf = await crypto.randomBytes(20);
        return buf.toString('hex');
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

