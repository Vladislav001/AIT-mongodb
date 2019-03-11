const fs = require('fs');

function getLoginPictograms(req, jsonStringify = true) {
    let pictogramsPath = `./public/system_images/pictograms/login`;
    let pictograms = [];

    // пройдемся по всем пиктограммам и сформируем массив объектов
    fs.readdirSync(pictogramsPath).forEach(pictogram => {
        let pictogramValue = pictogram.split('.')[0];

        let pictogramObject = {
            value: `_${pictogramValue}`,
            image: `${req.headers.host}/system_images/pictograms/login/${pictogram}`
        }

        pictograms.push(pictogramObject);
    });

    // отсортируем массив
    pictograms.sort(function (a, b) {
        let valueA = a['value'].replace(/_/g, "");
        let valueB = b['value'].replace(/_/g, "");

       return valueA - valueB;
    });

    if (jsonStringify) {
        return JSON.stringify(pictograms);
    } else {
        return pictograms;
    }

}


module.exports.getLoginPictograms = getLoginPictograms;