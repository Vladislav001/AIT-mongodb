const fs = require('fs');

function getLoginPictograms(req) {
    let pictogramsPath = `./public/system_images/pictograms/login`;
    let pictograms = [];

    // пройдемся по всем пиктограммам и сформируем массив объектов
    fs.readdirSync(pictogramsPath).forEach(pictogram => {
        let pictogramValue = pictogram.split('.')[0];

        let pictogramObject = {
            value: `_${pictogramValue}_`,
            image: `${req.headers.host}/system_images/pictograms/login/${pictogram}`
        }

        pictograms.push(pictogramObject);
    });
  
    return pictograms;
  }


module.exports.getLoginPictograms = getLoginPictograms;