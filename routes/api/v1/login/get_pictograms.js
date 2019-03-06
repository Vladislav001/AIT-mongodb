const fs = require('fs');

exports.get = function (req, res) {
    try {
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

        res.status(200).send(
            pictograms
         );
     } catch (err) {
        throw err;
    }

};
