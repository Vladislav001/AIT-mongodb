const PID = require('../../../models/pid');

exports.get = function(req, res) {
  PID.findById(req.userId, { password: 0 }, function (err, user) {
     if (err) return res.status(500).send('Error on the server: ' + err);
     if (!user) return res.status(404).send("No user found.");

     res.status(200).send(user);
   });
};
