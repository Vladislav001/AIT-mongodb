const Student = require('../../models/student');
 
exports.post = function(req, res) {
  Student.findOne({ 'login' : req.body.login }, function(err, user) {
    if (err){
      console.log('Error in SignUp: '+ err);
    }
    // already exists
    if (user) {
      return res.status(403).json('Student already exists with login: ' + req.body.login);
    } else {
      var newStudent = new Student();

      newStudent.login = req.body.login;
      newStudent.password = req.body.password;
      newStudent.name = req.body.name;
      newStudent.age = req.body.age;
      newStudent.gender = req.body.gender;
      //Если добавляем из ЛК, то по св-ву авторизованного, а если с публичного профиля - по GET
      if(req.user.access_level == 3){
        newStudent.parent_ID = req.user._id;
      } else {
        newStudent.parent_ID = req.body.idTag;
      }

      // save the user
      newStudent.save(function(err) {
        if (err){
          console.log('Error in Saving student: ' + err);
          throw err;
        }

      });
     
       res.redirect('/personalArea/1'); 
    }
  });
};
