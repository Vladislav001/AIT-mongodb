const Caregiver = require('../models/caregiver');
const PID = require('../models/pid');

exports.post = async function (req, res) {

  try {

    await PID.deleteMany({ parent_ID: req.params.idTag }); // удалим PID, привязанных к тренеру
    await Caregiver.deleteOne({ _id: req.params.idTag }); // удалим тренера

    res.redirect('/personalArea/1');
  } catch (err) {
    throw err;
  }

};
