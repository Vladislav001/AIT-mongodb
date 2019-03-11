const PID = require('../../models/pid');
const Admin = require('../../models/caregiver');
const pictogram = require('../../functions/pictograms');
const fs = require('fs');

exports.get = function (req, res) {

  // Как-то же надо проверять кого смотрим - ИСПРАВИТЬ ПО НОРМУ
  let publicPage;
  let url = req.url;
  if (url.indexOf("admins") != -1) {
    publicPage = "admins";
  } else if (url.indexOf("coaches") != -1) {
    publicPage = "coaches";
  } else if (url.indexOf("students") != -1) {
    publicPage = "students";
  }

  let pictograms = pictogram.getLoginPictograms(req);


  if (req.user.access_level == 3) {

    // Получим данные о конкретном студенте
    PID.findById(req.params._id, function (err, pid) {


      getPictogramsForPidLoginAndPassword(pid);

      res.render('publicProfile', {
        title: 'profileStudent',
        user: req.user,
        student: pid,
        pictograms: pictograms,
        currentPidLoginAndPassword: getPictogramsForPidLoginAndPassword(pid)
      });
    });
  } else if (req.user.access_level == 2) {
    // Получим данные о конкретном тренере - его список студентов
    PID.find({ parent_ID: req.params._id }, function (err, pids) {
      // Получим данные о конкретном студенте
      PID.findById(req.params._id, function (err, pid) {

        res.render('publicProfile', {
          title: 'profileAdmin',
          user: req.user,
          lengthStudents: pids.length,
          publicPage: publicPage,
          _id: req.params._id,
          students: pids,
          student: pid,
          pictograms: pictograms
        });
      });
    });
  } else if (req.user.access_level == 1) {
    // Получим данные о конкретном админе(НЕ ГЛАВНОМ) - его список тренеров
    Admin.find({ parent_ID: req.params._id }, function (err, coaches) {
      // Получим данные о конкретном тренере - его список студентов
      PID.find({ parent_ID: req.params._id }, function (err, pids) {
        // Получим данные о конкретном студенте
        PID.findById(req.params._id, function (err, pid) {

          console.log(pid)

          res.render('publicProfile', {
            title: 'profileAdmin',
            user: req.user,
            lengthCoaches: coaches.length,
            lengthStudents: pids.length,
            publicPage: publicPage,
            _id: req.params._id,
            coaches: coaches,
            students: pids,
            student: pid,
            pictograms: pictograms
          });
        });
      });
    });
  }

};



function getPictogramsForPidLoginAndPassword(pid) {
  let pictogramsPath = `./public/system_images/pictograms/login`;
  let currentLoginPictograms = [];
  let currentPasswordPictograms = [];

  // распарсим логин и пароль по каждой пиктограмме
  currentLoginPictograms = pid.login.split('_');
  currentLoginPictograms.shift(); // т.к первый символ всегда с "_"
  currentPasswordPictograms = pid.password.split('_');
  currentPasswordPictograms.shift();

  // сформируем массив картинок для логина и пароля
  let loginAndPasswordPictograms = {};
  loginAndPasswordPictograms['LOGIN'] = [];
  loginAndPasswordPictograms['PASSWORD'] = [];

  // занесем в массив, предварительно узнав расширение
  fs.readdirSync(pictogramsPath).forEach(pictogram => {

    let pictogramValue = pictogram.split('.')[0];
    let pictogramExtension = pictogram.split('.')[1];

    if (currentLoginPictograms.indexOf(pictogramValue) != -1) {
      let position = currentLoginPictograms.indexOf(pictogramValue);
      loginAndPasswordPictograms['LOGIN'][position] = `/system_images/pictograms/login/${pictogramValue}.${pictogramExtension}`;
    }

    if (currentPasswordPictograms.indexOf(pictogramValue) != -1) {
      let position = currentPasswordPictograms.indexOf(pictogramValue);
      loginAndPasswordPictograms['PASSWORD'][position] = `/system_images/pictograms/login/${pictogramValue}.${pictogramExtension}`;
    }

  });

  return JSON.stringify(loginAndPasswordPictograms);
}
