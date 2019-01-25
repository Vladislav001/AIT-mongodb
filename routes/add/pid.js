const PID = require('../../models/pid');
 
exports.post = function(req, res) {
  PID.findOne({ 'login' : req.body.login }, function(err, user) {
    if (err){
      console.log('Error in SignUp: '+ err);
    }
    // already exists
    if (user) {
      return res.status(403).json('Student already exists with login: ' + req.body.login);
    } else {
      var newPID = new PID();

      newPID.login = req.body.login;
      newPID.password = req.body.password;
      newPID.name = req.body.name;
      newPID.age = req.body.age;
      newPID.gender = req.body.gender;
      //Если добавляем из ЛК, то по св-ву авторизованного, а если с публичного профиля - по GET
      if(req.user.access_level == 3){
        newPID.parent_ID = req.user._id;
      } else {
        newPID.parent_ID = req.body.idTag;
      }

      // save the user
      newPID.save(function(err) {
        if (err){
          console.log('Error in Saving student: ' + err);
          throw err;
        }

      });
     
       res.redirect('/personalArea/1'); 
    }
  });
};
