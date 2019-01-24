const Student = require('../models/student');
const Application = require('../models/application');
const express = require('express');

exports.post = function (req, res) {

  //remove settings of student before removing him
  Application.find({ name: 'MoneyGame' }, function (err, application) {
    let settings;
    let indexInArray = false;

    settings = application[0].settings;
    settings.map((item, index) => {
      for (var key in item) {
        if (key == req.params.idTag) {
          indexInArray = index;
          break;
        }
      }
    })

    //if settings exist, then remove
    if (indexInArray !== false) {
      settings.splice(indexInArray, 1);
      Application.update({ name: 'MoneyGame' }, { $set: { settings: settings } }, function (err, data) { });
    }

  });

  //removing student from DB
  Student.deleteOne({ _id: req.params.idTag }, function (err) {
    if (err) return next(err)
  });


  res.redirect('/personalArea/1');
};
