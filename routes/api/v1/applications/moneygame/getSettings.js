// Надо подумать как решить такую длинную фигню ../../../.........
var Student = require('../../../../../models/student');
var Application = require("../../../../../models/application");
var express = require('express');

exports.get = function (req, res) {
    Student.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send('Error on the server: ' + err);
        if (!user) return res.status(404).send("No user found.");

        Application.find({ name: 'MoneyGame' }, { settings: [user.id] }, function (err, application) {

            var indexInArray = false; //index in settings array
            var settings; //settings query
            if (application) {
                settings = application[0].settings;
                settings.map((item, index) => {
                    for (var key in item) {
                        if (key == user.id) {
                            indexInArray = index;
                            break;
                        }
                    }
                })

                if (indexInArray !== false) {
                    res.status(200).send(
                        settings[indexInArray][user.id],
                    );
                } else {

                    // default settings with images's paths
                    var defaultSettings = {
                        [user.id]: {
                            backBtn: "/application/applicationImages/MoneyGame/backBtn/1.png",
                            progressBar: "false",
                            nextBtn: "/application/applicationImages/MoneyGame/nextBtn/1.png",
                            againBtn: "/application/applicationImages/MoneyGame/againBtn/1.png",
                            wallet: "/application/applicationImages/MoneyGame/wallet/1.png",
                            basket: "/application/applicationImages/MoneyGame/basket/1.png"
                        }
                    }

                    Application.findOneAndUpdate({ name: 'MoneyGame' }, { $push: { settings: defaultSettings } }, { safe: true, upsert: true }, function (err, application) {
                        Application.find({ name: 'MoneyGame' }, { settings: [user.id] }, function (err, application) {
                            indexInArray = false;
                            settings = application[0].settings;
                            settings.map((item, index) => {
                                for (var key in item) {
                                    if (key == user.id) {
                                        indexInArray = index;
                                        break;
                                    }
                                }
                            })
                            res.status(200).send(
                                settings[indexInArray][user.id],
                            );
                        });
                    });
                }
            }
        });
    });
}
