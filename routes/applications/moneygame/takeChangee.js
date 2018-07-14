var Student = require("../../../models/student");
var Application = require("../../../models/application");
var express = require("express");

exports.get = function (req, res) {
  // Получим данные о конкретном студенте
  Student.findById(req.params.idTag, function (err, student) {
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
          res.render("./applications/moneygame/takeChangee", {
            student: student,
            settings: JSON.stringify(settings[indexInArray][req.params.idTag]),
            host: req.headers.host
          });
        } else {
          // default settings with images's paths
          var defaultSettings = {
            [req.params.idTag]: {
          backBtn: "/application/applicationImages/MoneyGame/backBtn/1.png",
          progressBar: false,
          nextBtn: "/application/applicationImages/MoneyGame/nextBtn/1.png",
          againBtn: "/application/applicationImages/MoneyGame/againBtn/1.png",
          wallet: "/application/applicationImages/MoneyGame/wallet/1.png",
          basket: "/application/applicationImages/MoneyGame/basket/1.png"
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

            res.render("./applications/moneygame/takeChangee", {
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
