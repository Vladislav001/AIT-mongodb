const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {
        await Module.deleteOne({ _id: req.params._id});
    } catch (err) {
        throw err;
    }
};
