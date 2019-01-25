const PID = require('../../../../../models/pid');
const Application = require("../../../../../models/application");

exports.get = function (req, res) {
  PID.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send('Error on the server: ' + err);
    if (!user) return res.status(404).send("No user found.");

    Application.find({ name: 'MoneyGame' }, { settings: [user.id] }, function (err, application) {

      var indexInArray = false; //index in settings array
      var settings; //settings query
      if (application) {
        settings = application[0].settings;
        settings.map((item, index) => {
          for (var key in item) {
            if (key == user.id) {
              indexInArray = index;
              break;
            }
          }
        })

        if (indexInArray !== false) {
          res.status(200).send({
            "backBtn": req.headers.host + settings[indexInArray][user.id]["backBtn"],
            "progressBar": settings[indexInArray][user.id]["progressBar"],
            "nextBtn": req.headers.host + settings[indexInArray][user.id]["nextBtn"],
            "againBtn": req.headers.host + settings[indexInArray][user.id]["againBtn"],
            "wallet": req.headers.host + settings[indexInArray][user.id]["wallet"],
            "basket": req.headers.host + settings[indexInArray][user.id]["basket"]
          });
        } else {

          // default settings with images's paths
          var defaultSettings = {
            [user.id]: {
              backBtn: "/application/applicationImages/MoneyGame/backBtn/1.png",
              progressBar: false,
              nextBtn: "/application/applicationImages/MoneyGame/nextBtn/1.png",
              againBtn: "/application/applicationImages/MoneyGame/againBtn/1.png",
              wallet: "/application/applicationImages/MoneyGame/wallet/1.png",
              basket: "/application/applicationImages/MoneyGame/basket/1.png"
            }
          }

          Application.findOneAndUpdate({ name: 'MoneyGame' }, { $push: { settings: defaultSettings } }, { safe: true, upsert: true }, function (err, application) {
            Application.find({ name: 'MoneyGame' }, { settings: [user.id] }, function (err, application) {
              indexInArray = false;
              settings = application[0].settings;
              settings.map((item, index) => {
                for (var key in item) {
                  if (key == user.id) {
                    indexInArray = index;
                    break;
                  }
                }
              })

              settings[indexInArray][user.id]['progressBar'] = JSON.parse(settings[indexInArray][user.id]['progressBar']);

              Application.update({ name: 'MoneyGame' }, { $set: { settings: settings } }, function (err, data) {
                Application.find({ name: 'MoneyGame' }, { settings: [user.id] }, function (err, application) {
                  indexInArray = false;
                  settings = application[0].settings;
                  settings.map((item, index) => {
                    for (var key in item) {
                      if (key == user.id) {
                        indexInArray = index;
                        break;
                      }
                    }
                  })

                  res.status(200).send(
                    {
                      "backBtn": req.headers.host + settings[indexInArray][user.id]["backBtn"],
                      "progressBar": settings[indexInArray][user.id]["progressBar"],
                      "nextBtn": req.headers.host + settings[indexInArray][user.id]["nextBtn"],
                      "againBtn": req.headers.host + settings[indexInArray][user.id]["againBtn"],
                      "wallet": req.headers.host + settings[indexInArray][user.id]["wallet"],
                      "basket": req.headers.host + settings[indexInArray][user.id]["basket"]
                    }
                  );
                });
              });
            });
          });
        }
      }
    });
  });
}
