const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Admin = require('../models/user');

router.get('/personalArea/:page', function (req, res) {

    const perPage = 10; // сколько человек отображать
    const page = req.params.page || 1;

    if (req.user.access_level == 3) {
        // Получим список студентов, привязанных к тренеру
        Student // получаем объекты
            .find({ parent_ID: req.user._id })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, students) {
                Student.find({ parent_ID: req.user._id }).countDocuments().exec(function (err, count) { // получаем кол-во объектов
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
            .find({ parent_ID: req.user._id })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, coaches) {
                Admin.find({ parent_ID: req.user._id }).countDocuments().exec(function (err, count) { // получаем кол-во объектов
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
            .find({
                $and: [
                    { $or: [{ access_level: 2 }, { parent_ID: { '$exists': false } }] },
                    { _id: { $ne: req.user.id } }
                ]
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, admins) {
                Admin.find({
                    $and: [
                        { $or: [{ access_level: 2 }, { parent_ID: { '$exists': false } }] },
                        { _id: { $ne: req.user.id } }
                    ]
                })
                    .countDocuments()
                    .exec(function (err, count) { // получаем кол-во объектов
                        if (err) return next(err)
                        res.render('personalArea', {
                            admins: admins,
                            current: page,
                            pages: Math.ceil(count / perPage),
                            user: req.user,
                        })
                    })
            })
    }


});

module.exports = router;
