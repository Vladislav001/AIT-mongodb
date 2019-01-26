const PID = require('../../models/pid');
const moneyGame = require('../../models/money_game');
const constants = require('../../functions/constants');

exports.post = function (req, res) {
  PID.findOne({ 'login': req.body.login }, function (err, pid) {
    if (err) {
      throw err;
    }

    if (pid) {
      return res.status(403).json('PID already exists with login: ' + req.body.login);
    } else {
      let newPID = new PID();

      newPID.login = req.body.login;
      newPID.password = req.body.password;
      newPID.name = req.body.name;
      newPID.age = req.body.age;
      newPID.gender = req.body.gender;
      //Если добавляем из ЛК, то по св-ву авторизованного, а если с публичного профиля - по GET
      if (req.user.access_level == 3) {
        newPID.parent_ID = req.user._id;
      } else {
        newPID.parent_ID = req.body.idTag;
      }

      let newMoneyGame = new moneyGame();
      newMoneyGame.pid_id = newPID._id;
      newMoneyGame.settings = constants.MONEY_GAME_SETTINGS;

        newPID.save(function (err) {
          if (err) {
            throw err;
          }
          newMoneyGame.save(function (err) {
            if (err) {
              throw err;
            }
          });
        });

      res.redirect('/personalArea/1');
    }
  });
};
