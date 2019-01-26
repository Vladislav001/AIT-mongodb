const PID = require("../../../models/pid");
const MoneyGame = require("../../../models/money_game");
const countFiles = require('../../../functions/getCountFilesInDirectory');

exports.get = async function (req, res) { 

  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: req.params.idTag }, {'settings': 1, _id: 0});
    let pid = await PID.findOne({ _id: req.params.idTag });

    res.render("./applications/moneygame/collectionMoney", {
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
  
  Application.find({ name: 'MoneyGame' }, function (err, application) {
    var settings;
    var indexInArray;

    settings = application[0].settings;
    // Выбирает ВСЕХ студентов - очень плохо, думать как переделать (знать индекс бы сразу)
    settings.map((item, index) => {
      for (var key in item) {
        if (key == req.params.idTag) {
          indexInArray = index;
          break;
        }
      }
    })

    settings[indexInArray][req.params.idTag] = req.body;
    // if (req.body.progressBar == 'true')
    settings[indexInArray][req.params.idTag]['progressBar'] = JSON.parse(req.body.progressBar);
    // else settings[indexInArray][req.params.idTag]['progressBar'] = false;

    Application.update({ name: 'MoneyGame' }, { $set: { settings: settings } }, function (err, data) { });
  });
}
