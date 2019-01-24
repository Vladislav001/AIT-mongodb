const Student = require('../../../models/student');

exports.post = function(req, res) {
  Student.updateOne({
    "_id": req.userId
  }, {
    $set: {
      "name":  req.body.name,
    }
  }, function(err, results) {
    if (err) return res.status(500).send('Error on the server: ' + err);
    res.status(200).send({ results: "Данные успешно обновлены" });
  });
};
