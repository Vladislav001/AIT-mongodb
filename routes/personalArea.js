var express = require('express');
var router = express.Router();

router.get('/personalArea', function(req, res, next) {
  res.render('personalArea', { title: 'personalArea',  user: req.user  });
  console.log(res.__('Hello i18n'));
});


module.exports = router;
