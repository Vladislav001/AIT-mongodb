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

  //console.log(req.params.idTag); // все ок, НО 2 раза приходят данные(1 норм, 2 - undefined)

  Student.findOne({ 'login' : req.body.login }, function(err, student) {
    if (err){
     throw err;
    //return res.status(500).json("An unexpected error occurred. Please try again later.");
    }
    if (student) {
      res.send('Student already exists with login: ' + req.body.login);
    } else {
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
        if(err){
        //return res.status(500).json("An unexpected error occurred. Please try again later.");
         throw err;
        } else {
            res.send("Data successfully updated");
        }
      });
    }
  });






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

  //  res.redirect('/publicProfile/students/id' + req.params.idTag);
};
