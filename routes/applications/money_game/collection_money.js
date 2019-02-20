const PID = require("../../../models/pid");
const MoneyGame = require("../../../models/money_game");
const countFiles = require('../../../functions/getCountFilesInDirectory');
const fs = require('fs');




exports.get = async function (req, res) {

  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: req.params._id }, { 'settings': 1, 'currency': 1, _id: 0 });
    let pid = await PID.findOne({ _id: req.params._id });

    let currencyPath = `./public/system_images/currency/${moneyGame.currency}/`;
    let currencyImages = [];
    
    // возможно переделать на async
    fs.readdirSync(currencyPath).forEach(file => {
      currencyImages.push(`./currency/${file}`);
    });

    res.render("./applications/moneygame/collectionMoney", {
      student: pid,
      settings: JSON.stringify(moneyGame.settings),
      currency: moneyGame.currency,
      currencyImages: currencyImages,
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
      currency:  req.body.currency ? req.body.currency : "euro"
    }
    
    await MoneyGame.updateOne({ pid_id: req.params._id }, {
      $set: updateData
    });

  } catch (err) {
    throw err;
  }

}
