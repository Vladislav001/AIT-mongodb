const nodemailer = require('nodemailer');

//Выслать на почту уведомление, потом вынести из , addAdmin (вызов 1 фун-ции везде)
function sendEmailSuccesRegistration(url, recipient) {
  // указываем данные от почты: логин и пароль
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  let mailOptions = {
    from: '',
    to: recipient, // для нескольких - через запятую 'myfriend@yahoo.com, myotherfriend@yahoo.com'
    subject: 'Registration successful',
    html: '<h1>Congratulations on registration</h1><br><p><a href="http://' + url + '">Go to the site!</a></p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports.sendEmailSuccesRegistration = sendEmailSuccesRegistration;
