var express = require('express');
var router = express.Router();

router.get('/personalArea', function(req, res) {
  res.render('personalArea', { title: 'personalArea',  user: req.user  });
});

module.exports = router;
