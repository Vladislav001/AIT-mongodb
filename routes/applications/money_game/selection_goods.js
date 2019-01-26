const PID = require("../../../models/pid");
const Application = require("../../../models/application");
const countFiles = require('../../../functions/getCountFilesInDirectory');

exports.get = function (req, res) {
  // Получим данные о конкретном студенте
  PID.findById(req.params.idTag, function (err, student) {
    Application.find({ name: 'MoneyGame' }, { settings: req.params.idTag }, function (err, application) {

      var indexInArray = false; //index in settings array
      var settings; //settings query
      if (application) {
        settings = application[0].settings;
        settings.map((item, index) => {
          for (var key in item) {
            if (key == req.params.idTag) {
              indexInArray = index;
              break;
            }
          }
        })

        if (indexInArray !== false) {
          res.render("./applications/moneygame/selectionGoods", {
            student: student,
            settings: JSON.stringify(settings[indexInArray][req.params.idTag]),
            host: req.headers.host,
            countFiles: countFiles.getCountFilesInDirectoryMoneyGame()
          });
        } else {
          // default settings with images's paths
          var defaultSettings = {
            [req.params.idTag]: {
          backBtn: "/applications/money_game/backBtn/1.png",
          progressBar: false,
          nextBtn: "/applications/money_game/nextBtn/1.png",
          againBtn: "/applications/money_game/againBtn/1.png",
          wallet: "/applications/money_game/wallet/1.png",
          basket: "/applications/money_game/basket/1.png"
            }
          }

          Application.findOneAndUpdate({ name: 'MoneyGame' }, { $push: { settings: defaultSettings } }, { safe: true, upsert: true }, function (err, application) {
            if (err) console.log(err);
            else console.log(application);
          });

          Application.find({ name: 'MoneyGame' }, { settings: req.params.idTag }, function (err, application) {
            indexInArray = false;
            settings = application[0].settings;
            settings.map((item, index) => {
              for (var key in item) {
                if (key == req.params.idTag) {
                  indexInArray = index;
                  break;
                }
              }
            })
            console.log('after pushing ' + settings[indexInArray][req.params.idTag]);

            res.render("./applications/moneygame/selectionGoods", {
              student: student,
              settings: JSON.stringify(settings[indexInArray][req.params.idTag]),
              host: req.headers.host
            });
          });
        }
      }
    });
  });
}

exports.post = function (req, res) {
  Application.find({ name: 'MoneyGame' }, function (err, application) {
    var settings;
    var indexInArray;

    settings = application[0].settings;
    settings.map((item, index) => {
      for (var key in item) {
        if (key == req.params.idTag) {
          indexInArray = index;
          break;
        }
      }
    })

    settings[indexInArray][req.params.idTag] = req.body;
    settings[indexInArray][req.params.idTag]['progressBar'] = JSON.parse(req.body.progressBar);

    Application.update({ name: 'MoneyGame' }, { $set: { settings: settings } }, function (err, data) {});
  });
}
