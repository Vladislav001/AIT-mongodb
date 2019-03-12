const express = require('express');
const router = express.Router();
const PID = require('../../models/pid');
const Admin = require('../../models/caregiver');
const pictogram = require('../../functions/pictograms');

router.get('/personalArea/:page', function (req, res) {

    const perPage = 10; // сколько человек отображать
    const page = req.params.page || 1;

    // Протестить когда будет подключение к монге 
    // try {
    //     if (req.user.access_level == 3) {

    //         let pictograms = pictogram.getLoginPictograms(req);
    //         let pids = await PID.find({ parent_ID: req.user._id }).skip((perPage * page) - perPage).limit(perPage).exec();
    //         let count = await PID.find({ parent_ID: req.user._id }).countDocuments().exec();
    //         res.render('personalArea', {
    //             students: pids,
    //             current: page,
    //             pages: Math.ceil(count / perPage),
    //             pictograms: pictograms,
    //             user: req.user,
    //         })
    //     }
    // } catch (err) {
    //     throw err;
    // }


    if (req.user.access_level == 3) {
        let pictograms = pictogram.getLoginPictograms(req);

        // Получим список студентов, привязанных к тренеру
        PID // получаем объекты
            .find({ parent_ID: req.user._id })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, pids) {
                PID.find({ parent_ID: req.user._id }).countDocuments().exec(function (err, count) { // получаем кол-во объектов
                    if (err) return next(err)
                    res.render('personalArea', {
                        students: pids,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        pictograms: pictograms,
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
