const Module = require('../../models/module');

exports.get = async function (req, res) {
    // Получим все модули
    let modules = await Module.find({});

    res.render('modules/list', {
        user: req.user,
        modules: modules,
    });
};
