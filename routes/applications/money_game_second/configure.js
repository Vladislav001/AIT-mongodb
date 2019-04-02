const PID = require("../../../models/pid");
const MoneyGame = require("../../../models/money_game_second");
const countFiles = require('../../../functions/getCountFilesInDirectory');

exports.get = async function (req, res) {

  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: req.params._id }, { 'settings': 1, 'currency': 1, _id: 0 });
    let pid = await PID.findOne({ _id: req.params._id });

    res.render("./applications/moneygame_second/configure", {
      pid: pid,
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
      basket: req.body.basket,
      background_color: req.body.background_color
    }

    let updateData = {
      settings: objectSettings
    }

    await MoneyGame.updateOne({ pid_id: req.params._id }, {
      $set: updateData
    });

  } catch (err) {
    throw err;
  }

}
