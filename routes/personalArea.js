var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var Admin = require('../models/user');
//https://metanit.com/nosql/mongodb/2.4.php
// Пагинация https://evdokimovm.github.io/javascript/nodejs/mongodb/pagination/expressjs/ejs/bootstrap/2017/08/20/create-pagination-with-nodejs-mongodb-express-and-ejs-step-by-step-from-scratch.html

router.get('/personalArea/:page', function(req, res) {

  var perPage = 10; // сколько человек отображать
  var page = req.params.page || 1;

if(req.user.access_level == 3) {
  // Получим список студентов, привязанных к тренеру
  Student // получаем объекты
      .find({parent_ID: req.user._id})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, students) {
          Student.find({parent_ID: req.user._id}).countDocuments().exec(function(err, count) { // получаем кол-во объектов
              if (err) return next(err)
              res.render('personalArea', {
                  students: students,
                  current: page,
                  pages: Math.ceil(count / perPage),
                  user: req.user,
              })
          })
      })
} else if (req.user.access_level == 2) {
    // Получим список тренеров, привязанных к админу
    Admin
        .find({parent_ID: req.user._id})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, coaches) {
            Admin.find({parent_ID: req.user._id}).countDocuments().exec(function(err, count) { // получаем кол-во объектов
                if (err) return next(err)
                res.render('personalArea', {
                    coaches: coaches,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    user: req.user,
                })
            })
        })
} else if (req.user.access_level == 1) {
    // Получим список админов(НЕ ГЛАВНЫХ) и тренеров без parent_ID(родители) + исключим себя(у нас так же ведь нет parent_ID - чтобы не попасть под 2 условие)
    Admin
    .find({ $and : [
      { $or: [ { access_level: 2 }, { parent_ID: {'$exists' : false} } ] },
      { _id: { $ne: req.user.id } }
    ] })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, admins) {
            Admin.find({ $and : [
                  { $or: [ { access_level: 2 }, { parent_ID: {'$exists' : false} } ] },
                  { _id: { $ne: req.user.id } }
                ] })
                .countDocuments()
                .exec(function(err, count) { // получаем кол-во объектов
                if (err) return next(err)
                res.render('personalArea', {
                    admins: admins,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    user: req.user,
                })
            })
        })

    // Пример без пагинации - для 2 выше надо find({parent_ID: parent_ID: req.user._id }
    // Admin.find({access_level: 2 },  function(err, admins) {
    //   res.render('personalArea', {
    //     user: req.user,
    //     admins: admins
    //   });
    // });
}




});

module.exports = router;
