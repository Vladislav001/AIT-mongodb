const jwt = require('jsonwebtoken');
const apiError = require('../../../../functions/apierror');
const constants = require('../../../../functions/constants');

exports.get = function (req, res) {
    try {
        let pictogramsPath = `./public/system_images/pictograms/login`;
        let pictograms = {};

        res.status(200).send(
            'currentCurrency'
         );
     } catch (err) {
        throw err;
    }

};
