const PID = require('../../models/pid');
const Admin = require('../../models/caregiver');


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

  if (req.user.access_level == 3) {

    // Получим данные о конкретном студенте
    PID.findById(req.params.idTag, function (err, student) {

      res.render('publicProfile', {
        title: 'profileStudent',
        user: req.user,
        student: student
      });
    });
  } else if (req.user.access_level == 2) {
    // Получим данные о конкретном тренере - его список студентов
    PID.find({ parent_ID: req.params.idTag }, function (err, students) {
      // Получим данные о конкретном студенте
      PID.findById(req.params.idTag, function (err, student) {
        res.render('publicProfile', {
          title: 'profileAdmin',
          user: req.user,
          lengthStudents: students.length,
          publicPage: publicPage,
          idTag: req.params.idTag,
          students: students,
          student: student
        });
      });
    });
  } else if (req.user.access_level == 1) {
    // Получим данные о конкретном админе(НЕ ГЛАВНОМ) - его список тренеров
    Admin.find({ parent_ID: req.params.idTag }, function (err, coaches) {
      // Получим данные о конкретном тренере - его список студентов
      PID.find({ parent_ID: req.params.idTag }, function (err, students) {
        // Получим данные о конкретном студенте
        PID.findById(req.params.idTag, function (err, student) {
          res.render('publicProfile', {
            title: 'profileAdmin',
            user: req.user,
            lengthCoaches: coaches.length,
            lengthStudents: students.length,
            publicPage: publicPage,
            idTag: req.params.idTag,
            coaches: coaches,
            students: students,
            student: student
          });
        });
      });
    });
  }

};
