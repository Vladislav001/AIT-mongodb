const PID = require('../models/pid');
const MoneyGame = require('../models/money_game');

exports.post = async function (req, res) {
  try {

    await MoneyGame.deleteOne({ pid_id: req.params.idTag });
    await PID.deleteOne({ _id: req.params.idTag });

    res.redirect('/personalArea/1');
  } catch (err) {
    throw err;
  }

};
