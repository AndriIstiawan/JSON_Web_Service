const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const arrayUniquePlugin = require('mongoose-unique-array');
const Schema = mongoose.Schema;

const ContributorSchema = new Schema({
    contribution: {
        type: Number,
    },
    email: [{ type: String, unique: true }],
    slug: {
        type: String,
    },
})

ContributorSchema.plugin(timestamps)
ContributorSchema.plugin(arrayUniquePlugin);

module.exports = mongoose.model("Contributor", ContributorSchema);
