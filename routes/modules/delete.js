const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {console.log(req.params._id)
        await Module.deleteOne({ id: req.params._id });
        res.redirect('/modules/1');
    } catch (err) {
        throw err;
    }

};
