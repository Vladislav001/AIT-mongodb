const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {
        let search = req.body.search_module;
        // TODO полнотекстовый
        let foundModules = await Module.find({ name: search});

        res.json({ modules: foundModules })
    } catch (err) {
        throw err;
    }
};
