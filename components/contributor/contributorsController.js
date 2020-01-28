const { findOneByToken, findContribution, createContribution, updateContribution } = require('./contributorsService')

// CREATE an VR Content
exports.create = async (req, res) => {
    try {
        let user = await findOneByToken(req.params.token)
        if (!user) {
            return res.status(400).send({ message: "Link tidak valid atau telah kedaluwarsa." })
        }
        let contributor;
        let contribution = await findContribution(req.params.token)
        if (!contribution) {
            contributor = await createContribution(req.body.email, req.params.token)
        } else {
            contributor = await updateContribution(req.body.email, contribution)
        }
        res.status(201).json({ success: true, message: "Successfully add new content", content: contributor });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error" });
    }
};