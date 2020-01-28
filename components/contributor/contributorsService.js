const Generator = require('../generator/generatorsModel');
const Contributor = require('./contributorsModel');

exports.findOneByToken = async (token) => {
    return Generator.findOne({
        token: token,
        tokenExpires: { $gt: Date.now() }
    });
}

exports.findContribution = async (slug) => {
    return Contributor.findOne({ slug: slug });
}

exports.createContribution = async (email, slug) => {
    return new Contributor({
        contribution: 1,
        email: email,
        slug: slug
    }).save();
}

exports.updateContribution = async (email, contribution) => {
    contribution.contribution++;
    contribution.email.push(email)
    return contribution.save();
}
