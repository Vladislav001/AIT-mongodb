const Coach = require('../models/caregiver');
const PID = require('../models/pid');
const async = require('async');

exports.post = function(req, res) {

  // Необходимо выполнить последоватеьное удаление - ибо иногда тренер удаляется раньше, чем студенты -> студенты не удалились из БД
  async.waterfall(
      [
          function(callback) {
            // Удаляем студентов, привязанных к тренеру
            var deleteStudents = PID.deleteMany({parent_ID : req.params.idTag}, function (err) {});
              callback(null, deleteStudents);
          },
          function(deleteStudents, callback) {
            // Удаляем тренера
              var deleteCoache = Coach.deleteOne({ _id: req.params.idTag }, function (err) {});
              callback(null, deleteCoache);
          },
      ],
      function (err, deleteCoache) {
        //  console.log(deleteAdmin);
          // Node.js and JavaScript Rock!
      }
  );


  // удаление студентов привязанных к нему или перепривязка??
  res.redirect('/personalArea/1');
};
