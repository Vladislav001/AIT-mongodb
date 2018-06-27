var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var Admin = require('../models/user');
//https://evdokimovm.github.io/javascript/nodejs/mongodb/pagination/expressjs/ejs/bootstrap/2017/08/20/create-pagination-with-nodejs-mongodb-express-and-ejs-step-by-step-from-scratch.html

router.get('/students/:page', function(req, res, next) {

      var perPage = 5
      var page = req.params.page || 1

      Student
          .find({})
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec(function(err, students) {
              Student.count().exec(function(err, count) {
                  if (err) return next(err)
                  res.render('students', {
                      students: students,
                      current: page,
                      pages: Math.ceil(count / perPage)
                  })
              })
          })

// if(req.user.access_level == 3) {
//   var students = [];
//
//   // Получим список студентов, привязанных к тренеру
//   Student.find({parent_ID: req.user._id },  function(err, data) {
//     //  console.log(err, data, data.length);
//     students = data;
//     res.render('students', {
//       title: 'personalArea',
//       user: req.user,
//       length: data.length,
//       students: students
//     });
//   });
// }

});

module.exports = router;
