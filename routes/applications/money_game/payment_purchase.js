const PID = require("../../../models/pid");
const MoneyGame = require("../../../models/money_game");
const countFiles = require('../../../functions/getCountFilesInDirectory');

exports.get = async function (req, res) {

  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: req.params.idTag }, { 'settings': 1, _id: 0 });
    let pid = await PID.findOne({ _id: req.params.idTag });

    res.render("./applications/moneygame/paymentPurchase", {
      student: pid,
      settings: JSON.stringify(moneyGame.settings),
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

    await MoneyGame.updateOne({ pid_id: req.params.idTag }, {
      $set: {
        settings: objectSettings
      }
    });

  } catch (err) {
    throw err;
  }

}