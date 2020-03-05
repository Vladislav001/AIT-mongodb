const Module = require('../../models/module');
const markdown = require( "markdown" ).markdown;
var request = require("request"),
    cheerio = require("cheerio"),
    url = "https://github.com/steam0111/HallScheme/blob/master/README.md";

exports.get = async function (req, res) {

    try {

        request(url, async function (error, response, body) {
            if (!error) {
                let $ = cheerio.load(body);
                let readmeData = $("#readme").html();
                let module = await Module.findOne({_id: req.params._id});
                readmeData = readmeData.replace(/\n/g, "");
                console.log(readmeData)

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