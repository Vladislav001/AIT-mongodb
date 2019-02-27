const PID = require("../../../models/pid");
const MoneyGame = require("../../../models/money_game");
const countFiles = require('../../../functions/getCountFilesInDirectory');
const fs = require('fs');


exports.get = async function (req, res) {

  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: req.params._id }, { 'settings': 1, 'currency': 1, _id: 0 });
    let pid = await PID.findOne({ _id: req.params._id });

    let availableCurrencies = `./public/system_images/currency/`;
    let availableCurrenciesDirs = [];
    let allCurrencies = {};

    // получим название всех папок с валютами 
    fs.readdirSync(availableCurrencies).forEach(dir => {
      availableCurrenciesDirs.push(dir);
    });

    // пройдемся по папкам валют
    availableCurrenciesDirs.forEach(currencyDir => {
      let currencyPath = `./public/system_images/currency/${currencyDir}`;
      allCurrencies[`${currencyDir}`] = {};

      // пройдемся по папкам монеты/банкноты
      fs.readdirSync(`${availableCurrencies}${currencyDir}`).forEach(typeCurrency => {
        allCurrencies[`${currencyDir}`][`${typeCurrency}`] = []

        // сформируем массивы для каждого типа
        fs.readdirSync(`${currencyPath}/${typeCurrency}`).forEach(currency => {
          allCurrencies[`${currencyDir}`][`${typeCurrency}`].push(`/system_images/currency/${currencyDir}/${typeCurrency}/${currency}`);
        });
      });
    });

    res.render("./applications/moneygame/collectionMoney", {
      pid: pid,
      settings: JSON.stringify(moneyGame.settings),
      currency: moneyGame.currency,
      allCurrencies: JSON.stringify(allCurrencies),
      host: req.headers.host,
      countFiles: countFiles.getCountFilesInDirectoryMoneyGame()
    });
  } catch (err) {
    throw err;
  }

}


exports.post = async function (req, res) {

  try {

    let objectSettings = {
      backBtn: req.body.backBtn,
      progressBar: req.body.progressBar,
      nextBtn: req.body.nextBtn,
      againBtn: req.body.againBtn,
      wallet: req.body.wallet,
      basket: req.body.basket
    }

    let updateData = {
      settings: objectSettings,
      currency: req.body.currency ? req.body.currency : "euro"
    }

    await MoneyGame.updateOne({ pid_id: req.params._id }, {
      $set: updateData
    });

  } catch (err) {
    throw err;
  }

}
