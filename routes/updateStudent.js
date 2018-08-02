const Student = require('../models/student');
const formidable = require('formidable');
const fs = require('fs');
const cloudinary = require('cloudinary');
const config  = require('../config').cloudinary;
cloudinary.config({
     cloud_name: config.cloud_name,
     api_key: config.api_key,
     api_secret: config.api_secret
});


exports.post = function(req, res) {

  // Обновим данные конкретнго студента
  Student.updateOne({
    "_id": req.params.idTag
  }, {
    $set: {
      "login": req.body.login,
      "name": req.body.name,
      "age": req.body.age,
      "gender": req.body.gender,
      //"profile_photo": profilePhotoPath

    }
  }, function(err, results) {

    console.log(results.result);
  });
  res.redirect('/publicProfile/students/id' + req.params.idTag);


  // var pid_ID =  req.params.idTag;
  // var form = new formidable.IncomingForm();
  // var profilePhotoPath;
  //
  //  form.parse(req, function (err, fields, files) {
  //   var oldpath = files.filetoupload.path;
  // //  profilePhotoPath = 'public/profilePhotos/' + pid_ID + ".png";
  //   profilePhotoPath = pid_ID + ".png";
  //
  //   cloudinary.uploader.upload(oldpath, function(profilePhoto) {
  //     console.log(profilePhoto);
  //     //profilePhoto.url.replace(new RegExp('"','g'),"")
  //
  //     Student.updateOne({
  //       "_id": req.params.idTag
  //     }, {
  //       $set: {
  //         "login": req.body.login,
  //         "name": req.body.name,
  //         "age": req.body.age,
  //         "gender": req.body.gender,
  //         "profile_photo": profilePhoto.url
  //       }
  //     }, function(err, results) {
  //
  //     });
  //   });
  // });
  //
  //  res.redirect('/publicProfile/students/id' + req.params.idTag);
};
