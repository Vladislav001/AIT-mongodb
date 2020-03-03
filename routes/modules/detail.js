const Module = require('../../models/module');

exports.get = async function (req, res) {

    try {
        let module = await Module.findOne({_id: req.params._id});

        res.render("modules/detail", {
            module: module,

        });
    } catch (err) {
        throw err;
    }

};