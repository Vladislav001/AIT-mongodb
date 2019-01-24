const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tests: { // будут привязываться к тренеру, создавшему тест
      type: Array,
      default: null
    },
    settings: { // будут привязываться к конкретному cтуденту
      type: Array,
      default: null
    },
});

applicationSchema.virtual('applicationId').get(function(){
    return this._id;
});

let Application = mongoose.model('Application', applicationSchema);

module.exports = Application;



// Приблизительный код добавления - надо бы через insert думаю(create т.к mongoose)
// var Application = require('./models/application');
//
// var newApplication = new Application();
// newApplication.name = 'MoneyGame';
// newApplication.description = 'About app';
// // save the user
// newApplication.save(function(err) {
//   if (err){
//     console.log('Error in Saving application: ' + err);
//     throw err;
//   }
//   console.log('Application Created succesful');
//
//   return newApplication;
//
// });
//
// Application.find({}) .exec(function(err, application) {
//   console.log(application + ' application');
// })


// или Application.create( { name: "I00001", description: "10/10/2012" } );
