const Module = require('../../models/module');
const markdown = require( "markdown" ).markdown;

exports.get = async function (req, res) {

    try {
        let module = await Module.findOne({_id: req.params._id});

        res.render("modules/detail", {
            module: module,
            data: markdown.toHTML( "Hello *World*!" )
        });
    } catch (err) {
        throw err;
    }

};