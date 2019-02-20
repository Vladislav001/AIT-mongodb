const MoneyGame = require("../../../../../models/money_game");
const fs = require('fs');

exports.post = async function (req, res) {
    try {

        let moneyGame = await MoneyGame.findOne({ pid_id: res.pidId }, { 'currency': 1, _id: 0 });
        let currencyPath = `./public/system_images/currency/${moneyGame.currency}/`;
        let currencyImages = [];

        // возможно переделать на async
        fs.readdirSync(currencyPath).forEach(file => {

            let count = file.replace(',', '.');
            let currency = {
                count: count,
                image: `${req.headers.host}/system_images/currency/${moneyGame.currency}/${file}`
            }

            currencyImages.push(currency);
        });

        res.status(200).send(
            {
                "currency": moneyGame.currency,
                "images": currencyImages
            }
        );
    } catch (err) {
        throw err;
    }
}
