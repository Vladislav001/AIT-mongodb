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
          res.render("./applications/moneygame/collectionMoney", {
            student: student,
            settings: JSON.stringify(settings[indexInArray][req.params.idTag]),
            host: req.headers.host
          });
        } else {
          // obj with default settings
          var defaultSettings = {
            [req.params.idTag]: {
              againBtn: '1',
              backBtn: '1',
              basket: '1',
              parnet: '1',
              progressBar: 'false'
            }
          }

          // default settings with images's paths
          // var defaultSettings = {
          //   [req.params.idTag]: {
          //     againBtn: 'public/application/applicationImages/againBtn/1.png',
          //     backBtn: 'public/application/applicationImages/backBtn/1.png',
          //     basket: 'public/application/applicationImages/basket/1.png',
          //     parnet: 'public/application/applicationImages/parnet/1.png',
          //     progressBar: 'false'
          //   }
          // }

          Application.findOneAndUpdate({ name: 'MoneyGame' }, { $push: { settings: defaultSettings } }, { safe: true, upsert: true }, function (err, application) {
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
              res.render("./applications/moneygame/collectionMoney", {
                student: student,
                settings: JSON.stringify(settings[indexInArray][req.params.idTag]),
                host: req.headers.host
              });
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
    Application.update({ name: 'MoneyGame' }, { $set: { settings: settings } }, function (err, data) { });
  });
}
