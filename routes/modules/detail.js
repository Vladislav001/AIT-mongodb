const Module = require('../../models/module');
const markdown = require( "markdown" ).markdown;
const request = require("request");
const cheerio = require("cheerio");

exports.get = async function (req, res) {

    try {
        let module = await Module.findOne({_id: req.params._id});
        let url = `${module.url}blob/master/README.md`;

        request(url, async function (error, response, body) {
            if (!error) {
                let $ = cheerio.load(body);
                let readmeData = $("#readme").html();

                //readmeData = readmeData.replace(/\n/g, "");
                //console.log(readmeData)

                res.render("modules/detail", {
                    module: module,
                    data: markdown.toHTML( "Hello *World*!" ),
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