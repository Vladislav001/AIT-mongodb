const pictogram = require('../../../../functions/pictograms');

exports.get = function (req, res) {
    try {
       let pictograms = pictogram.getLoginPictograms(req);

        res.status(200).send(
            pictograms
         );
     } catch (err) {
        throw err;
    }
};
