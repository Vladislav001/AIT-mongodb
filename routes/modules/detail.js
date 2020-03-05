const Module = require('../../models/module');
const request = require("request");
const cheerio = require("cheerio");

exports.get = async function (req, res) {

    try {
        let module = await Module.findOne({_id: req.params._id});
        let url = `${module.url}blob/master/README.md`;

        //TODO
        // Проверка, что url действительный

        request(url, async function (error, response, body) {
            if (!error) {
                let $ = cheerio.load(body);
                let readmeData = $("#readme").html();

                res.render("modules/detail", {
                    module: module,
                    readmeData:  readmeData,
                });
            } else {
                console.log("Произошла ошибка: " + error);
            }
        });

    } catch (err) {
        throw err;
    }

};