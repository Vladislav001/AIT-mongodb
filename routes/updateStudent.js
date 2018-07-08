var Student = require('../models/student');
// var formidable = require('formidable');
// var fs = require('fs');


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


  // На локалке все норм, но на хероку траблы с загрузкой + вообще надо бы хранить фотки либо на норм хостинге либо мб на S3
  // var pid_ID =  req.params.idTag;
  // var form = new formidable.IncomingForm();
  // var profilePhotoPath;
  //
  //   form.parse(req, function (err, fields, files) {
  //     var oldpath = files.filetoupload.path;
  //     profilePhotoPath = 'public/profilePhotos/' + pid_ID + ".png";
  //
  //     fs.rename(oldpath, profilePhotoPath, function (err) {
  //       if (err) throw err;
  //
  //       // Удалим из пути слово public - либо надо грузить без этого слова...
  //       profilePhotoPath = profilePhotoPath.replace("public", "");
  //
  //       Student.updateOne({
  //         "_id": req.params.idTag
  //       }, {
  //         $set: {
  //           "login": req.body.login,
  //           "name": req.body.name,
  //           "age": req.body.age,
  //           "gender": req.body.gender,
  //           "profile_photo": profilePhotoPath
  //         }
  //       }, function(err, results) {
  //
  //         console.log(results.result);
  //       });
  //     });
  // });

};
