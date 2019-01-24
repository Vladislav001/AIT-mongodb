const Student = require('../../models/student');

exports.get = function (req, res) {

  // Получим данные о конкретном студенте
  Student.findById(req.params.idTag, function (err, data) {
    if (err) {
      throw err;
    }
    
    res.render('testSettings', {
      title: 'testSettings',
      id: data._id,
      login: data.login,
      name: data.name,
      age: data.age,
      gender: data.gender
    });
  });

};
