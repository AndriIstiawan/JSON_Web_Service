const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    tokenExpires: {
        type: Date
    }
})

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(timestamps)

module.exports = mongoose.model("User", UserSchema);
